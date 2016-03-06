import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Syphon from 'backbone.syphon';

import _ from 'underscore';

import {ExerciseContainerView} from '../../exercises/views/list';
import {ExerciseList} from '../../exercises/collections/exercises';
import {SearchModel} from '../../exercises/models/search';

import {SetModel} from '../../sets/models/set';
import {SetList} from '../../sets/collections/sets';

import {SmallSetListView, PanelSetListView} from './set';


const ExerciseView = ExerciseContainerView.extend({
  className: '',

  onRender: function() {
    this.showChildView('sets', new PanelSetListView({
      collection: this.collection
    }));
  },

  onChildviewAddSet: function(options) {
    const fields = options.model.pick('weight', 'reps');
    fields.exercise_name = this.model.get('exercise_name');
    this.triggerMethod('add:set', fields);
  }
});

const SetLayoutView = Marionette.View.extend({
  tagName: 'form',
  className: 'form-horizontal',

  attributes: {
    method: 'post',
    action: ''
  },

  template: require('../templates/create/setform.html'),

  ui: {
    initial: '#id_weight',
    exerciseName: '#id_exercise_name'
  },

  regions: {
    previous: '.previous-exercise-hook'
  },

  events: {
    submit: 'addSet',
    'change @ui.exerciseName': 'searchExercises'
  },

  modelEvents: {
    change: 'render refocus'
  },

  collectionEvents: {
    add: 'fetchIds'
  },

  initialize: function() {
    const search = new SearchModel(this.model.pick('exercise_name'));
    const exerciseList =  new ExerciseList(null, {
      searchModel: search
    });
    this.options.exerciseList = exerciseList;
    this.options.searchModel = search;
  },

  onBeforeAttach: function() {
    const exerciseList = this.getOption('exerciseList');
    this.listenTo(exerciseList, 'sync', this.showPreviousWorkout);
  },

  onBeforeEmpty: function() {
    const exerciseList = this.getOption('exerciseList');
    this.stopListening(exerciseList);
  },

  onRender: function() {
    this.showPreviousWorkout();
  },

  addSet: function(e) {
    e.preventDefault();
    this.model.set(Syphon.serialize(this));

    if (this.model.isValid()) {
      this.collection.addSet(this.model);
      this.model.clearExerciseAttrs();
    }
  },

  refocus: function() {
    this.ui.initial.focus();
  },

  fetchIds: function(model, collection) {
    collection.setExerciseIds();

    if (!model.get('exercise')) {
      model.fetchExercise({
        success: () => collection.setExerciseIds()
      });
    }
  },

  searchExercises: function() {
    const data = Syphon.serialize(this);
    const exerciseName = data.exercise_name;
    const search = this.getOption('searchModel');
    const exerciseList = this.getOption('exerciseList');

    if (exerciseName) {
      search.set({exercise_name: exerciseName});
      exerciseList.fetch();
    }
  },

  setDetails: function(attrs) {
    this.model.set(attrs);
  },

  showPreviousWorkout: function() {
    const previous = this.getRegion('previous');
    const exerciseList = this.getOption('exerciseList');

    if (exerciseList.length) {
      let exercise = exerciseList.at(0);
      previous.show(new ExerciseView({
        model: exercise,
        collection: new SetList(exercise.getLastExercise()),
        index: 0
      }));
    }
    else if (previous.hasView()) {
      previous.empty();
    }
  },

  onChildviewAddSet: function(attrs) {
    this.setDetails(attrs);
  },

  /** Clear the sets from localstorage.
  */
  clearSets: function() {
    this.collection.clearStored();
  }
});

export const CreateWorkout = Marionette.View.extend({
  template: require('../templates/create/layout.html'),

  events: {
    'click @ui.save': 'saveWorkout'
  },

  triggers: {
    'click @ui.cancel': 'show:list'
  },

  modelEvents: {
    sync: 'renderSetList',
    save: 'saveComplete'
  },

  ui: {
    cancel: '.cancel-create',
    save: '.save-workout'
  },

  regions: {
    setForm: '.setform-hook',
    setList: '.setlist-hook'
  },

  initialize: function() {
    this.collection = new SetList(null);
    this.collection.fetchStored();
  },

  onRender: function() {
    this.showChildView('setForm', new SetLayoutView({
      model: new SetModel(),
      collection: this.collection
    }));
    this.showChildView('setList', new SmallSetListView({
      collection: this.collection
    }));
  },

  saveWorkout: function(e) {
    e.preventDefault();
    const data = Syphon.serialize(this);
    this.model.saveWorkout({
      workout_date: data.workout_date,
      sets: this.collection
    });
  },

  saveComplete: function() {
    this.triggerMethod('add:to:collection', this.model);
    this.triggerMethod('show:list');
  },

  onShowList: function() {
    const form = this.getChildView('setForm');
    form.clearSets();
    Backbone.history.navigate('workout/');
  },

  renderSetList: function() {
    _.each(this.model.get('sets'), (set) => {
      this.collection.addSet(set);
    });
  }
});
