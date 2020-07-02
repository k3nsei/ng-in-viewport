module.exports = {
  '.all-contributorsrc': function generateContributorsList() {
    return 'all-contributors generate';
  },
  'projects/ng-in-viewport/src/**/*.ts': function lint() {
    return 'ng lint ng-in-viewport';
  }
};
