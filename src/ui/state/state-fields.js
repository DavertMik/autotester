/**
 * List of fields describing ui state.
 */

const defaults = require('./defaults');
const {APP_STATE, FILES_SOURCE_TYPE, SETTINGS_MENU} = require('./constants');

/**
 * Empty project is needed to be returned on start before default project is loaded
 * It is more convenient than write `if (!this.selectedProject) {...}`
 */
const emptyProject = {
  id: 'empty',
  filesSource: {
    type: FILES_SOURCE_TYPE.INNER,
    url: '',
    path: '',
  },
  innerFiles: [],
  selectedFile: {
    [FILES_SOURCE_TYPE.INNER]: '',
    [FILES_SOURCE_TYPE.URL]: '',
    [FILES_SOURCE_TYPE.BUILT_IN]: '',
  },
};

exports.runtime = {
  // todo: rename to appStatus
  appState: APP_STATE.LOADING,
  outerFiles: [], // files that are loaded from URL or built-in
  selectedTab: -1,
  stopOnError: false,
};

exports.persistent = {
  projects: [],
  selectedProjectId: '',
  targets: defaults.targets,
  selectedTargetId: defaults.targets[0].id,
  hubs: defaults.hubs,
  selectedSettingsMenuItem: SETTINGS_MENU.TESTS_SOURCE,
};

exports.computed = {
  get selectedProject() {
    return this.projects.find(project => project.id === this.selectedProjectId) || emptyProject;
  },
  get filesSourceType() {
    return this.selectedProject.filesSource.type;
  },
  set filesSourceType(value) {
    this.selectedProject.filesSource.type = value;
  },
  get isInnerFiles() {
    return this.filesSourceType === FILES_SOURCE_TYPE.INNER;
  },
  /**
   * Visible list of files independent from source
   */
  get files() {
    return this.isInnerFiles ? this.innerFiles : this.outerFiles;
  },
  get innerFiles() {
    return this.selectedProject.innerFiles;
  },
  get selectedFile() {
    return this.selectedProject.selectedFile[this.filesSourceType] || '';
  },
  set selectedFile(value) {
    this.selectedProject.selectedFile[this.filesSourceType] = value;
  },
  get selectedTarget() {
    return this.targets.find(target => target.id === this.selectedTargetId);
  },
  get filesSourceUrl() {
    switch (this.filesSourceType) {
      case FILES_SOURCE_TYPE.URL:
        return this.selectedProject.filesSource.url;
      case FILES_SOURCE_TYPE.BUILT_IN:
        return chrome.runtime.getURL(this.selectedProject.filesSource.path);
      case FILES_SOURCE_TYPE.INNER:
      default:
        return '';
    }
  }
};

exports.all = Object.assign(
  exports.computed,
  exports.runtime,
  exports.persistent
);
