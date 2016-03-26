const Code = require('code');
const Lab = require('lab');

const lab = exports.lab = Lab.script();

const afterEach = lab.afterEach;
const beforeEach = lab.beforeEach;
const describe = lab.describe;
const expect = Code.expect;
const it = lab.it;

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
