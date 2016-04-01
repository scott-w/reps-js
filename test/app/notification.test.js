import expect from 'expect.js';

import {NotificationList} from '../../app/base/collections/notification';


describe('Notification List', () => {
  let notifications;

  beforeEach((done) => {
    notifications = new NotificationList();
    done();
  });

  afterEach((done) => {
    notifications = null;
    done();
  });

  it('adds success messages', (done) => {
    notifications.addSuccessMsg('test');

    expect(notifications.length).to.equal(1);
    const model = notifications.first();

    expect(model.get('alert_type')).to.equal('success');
    expect(model.get('alert_text')).to.equal('test');
    done();
  });

  it('adds error messages', (done) => {
    notifications.addErrorMsg('test');

    expect(notifications.length).to.equal(1);
    const model = notifications.first();

    expect(model.get('alert_type')).to.equal('error');
    expect(model.get('alert_text')).to.equal('test');
    done();
  });

  it('adds warning messages', (done) => {
    notifications.addWarningMsg('test');

    expect(notifications.length).to.equal(1);
    const model = notifications.first();

    expect(model.get('alert_type')).to.equal('warning');
    expect(model.get('alert_text')).to.equal('test');
    done();
  });
});

describe('Clear Notification List', () => {
  let notifications;

  beforeEach((done) => {
    notifications = new NotificationList([
      {alert_text: 'Warning', alert_type: 'warning'},
      {alert_text: 'Error', alert_type: 'error'},
      {alert_text: 'Success', alert_type: 'success'}
    ]);
    done();
  });

  afterEach((done) => {
    notifications = null;
    done();
  });

  it('can clear success messages', (done) => {
    notifications.clearSuccessMessages();
    expect(notifications.length).to.equal(2);

    notifications.each((notification) => {
      expect(notification.get('alert_type')).to.not.equal('success');
    });
    done();
  });

  it('can clear error messages', (done) => {
    notifications.clearErrorMessages();
    expect(notifications.length).to.equal(2);

    notifications.each((notification) => {
      expect(notification.get('alert_type')).to.not.equal('error');
    });
    done();
  });

  it('can clear warning messages', (done) => {
    notifications.clearWarningMessages();
    expect(notifications.length).to.equal(2);

    notifications.each((notification) => {
      expect(notification.get('alert_type')).to.not.equal('warning');
    });
    done();
  });

  it('can clear all messages', (done) => {
    notifications.clearAllMessages();
    expect(notifications.length).to.equal(0);
    done();
  });
});
