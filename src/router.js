import ProfilePage from './components/ProfilePage'
import TaskEntryPage from './components/TaskEntryPage'
import TaskInfoPage from './components/TaskInfoPage'
import LabelResultPage from './components/LabelResultPage'
import PageNotFound from './components/PageNotFound'

const routes = [
  { path: '/', redirect: '/Profile' },
  { 
    path: '/Profile', 
    component: ProfilePage, 
    meta: {
      title: '個人資訊'
    }
  },
  { 
    path: '/Tasks', 
    component: TaskEntryPage,
    meta: {
      title: '任務看板'
    } 
  },
  { 
    path: '/Task-info', 
    component: TaskInfoPage,
    meta: {
      title: '任務詳細說明'
    }  
  },
  { 
    path: '/Label-result', 
    component: LabelResultPage,
    meta: {
      title: '完成'
    }  
  },
  { 
    path: '*', 
    component: PageNotFound,
    meta: {
      title: '個人資訊'
    }  
  }
];

export default routes;