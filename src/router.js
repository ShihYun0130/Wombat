import ProfilePage from './components/ProfilePage'
import TaskEntryPage from './components/TaskEntryPage'
import TaskInfoPage from './components/TaskInfoPage'
import LabelResultPage from './components/LabelResultPage'
import PageNotFound from './components/PageNotFound'
import ClassificationLabel from './components/ClassificationLabel'
import NERTaskPage from './components/NERPage'
import TaskSettingPage from './components/TaskSettingPage'
import TaskExamplePage from './components/TaskExamplePage'
import TaskUploadPage from './components/TaskUploadPage'
import SuccessPage from './components/SuccessPage'
import OwnedTasksPage from './components/OwnedTasksPage'

const routes = [
  { path: '/', redirect: '/Profile' },
  {
    name: "profile",
    path: '/Profile',
    component: ProfilePage,
    meta: {
      title: '個人資訊'
    }
  },
  {
    name: "tasks",
    path: '/Tasks',
    component: TaskEntryPage,
    meta: {
      title: '任務看板'
    }
  },
  {
    name: "taskInfo",
    path: '/Task-info',
    component: TaskInfoPage,
    meta: {
      title: '任務詳細說明'
    }
  },
  {
    name: "labelResult",
    path: '/Label-result',
    component: LabelResultPage,
    meta: {
      title: '任務完成'
    }
  },
  {
    name: 'ClassificationLabel',
    path: '/classificationLabel',
    component: ClassificationLabel,
    meta: {
      title: '分類標註'
    }
  },
  {
    name: 'NERTaskPage',
    path: '/NERTaskPage',
    component: NERTaskPage,
    meta: {
      title: '實體標註'
    }
  },
  {
    name: 'TaskSettingPage',
    path: '/Task-setting',
    component: TaskSettingPage,
    meta: {
      title: '任務上傳'
    }
  },
  {
    name: 'TaskExamplePage',
    path: '/Task-example',
    component: TaskExamplePage,
    meta: {
      title: '任務上傳'
    }
  },
  {
    name: 'TaskUploadPage',
    path: '/Task-upload',
    component: TaskUploadPage,
    meta: {
      title: '任務上傳'
    }
  },
  {
    name: "SuccessPage",
    path: '/Success',
    component: SuccessPage,
    meta: {
      title: '建立成功'
    }
  },
  {
    name: "OwnedTasksPage",
    path: '/My-tasks',
    component: OwnedTasksPage,
    meta: {
      title: '我的任務'
    }
  },
  {
    path: '*',
    component: PageNotFound
  }
];

export default routes;