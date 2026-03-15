import * as simples from './simple';
import SimpleHorizontal from './simple-horizontal';
import Groups from './groups';
import Copy from './copy';
import Horizontal from './horizontal';
import Nested from './nested';
import NestedGroup from './nested-group';
import VanillaNested from './vanilla-nested';
import Height from './height';
import Form from './form';
import Cards from './cards';
import LockAxis from './lock-axis';
import DragDelay from './drag-delay';
import DragHandle from './drag-handle';
import DragClass from './drag-class';
import TransitionDuration from './transition-duration';
import DropZone from './drop-zone';
import Chess from './chess';
import ScrollBoth from './scroll-both';
import DynamicContainers from './dynamic-containers';


const getUrl = (pagename: string): string => {
  return `https://github.com/lucasferreiraeng/mekanysmos-smooth-dnd-demo/blob/master/src/demo/pages/${pagename}`;
};


export default [
  {
    title: 'Showcase',
    pages: [
      // {
      //   title: 'Chess', page: Chess, url: getUrl('form.js')
      // },
      {
        title: 'Card board', page: Cards, url: getUrl('cards.tsx')
      },
      {
        title: 'Form elements', page: Form, url: getUrl('form.tsx')
      }
    ]
  }, {
    title: 'Basic Sortables',
    pages: [
      {
        title: 'Sortable with default options', page: simples.Simple, url: getUrl('simple.tsx')
      },
      {
        title: 'Sortable inside scroller', page: simples.SimpleScroller, url: getUrl('simple.tsx')
      }, {
        title: 'Horizontal sortable', page: SimpleHorizontal, url: getUrl('horizontal.tsx')
      }
    ]
  },
  {
    title: 'Groups',
    pages: [
      {
        title: 'DnD between groups', page: Groups, url: getUrl('groups.tsx')
      },
      {
        title: 'Copy draggable', page: Copy, url: getUrl('copy.tsx')
      },
      // {
      //   title: 'auto scroll', page: ScrollBoth, url: getUrl('copy.tsx')
      // },
      // {
      //   title: 'Drop Zones', page: DropZone, url: getUrl('drop-zone.tsx')
      // }
    ]
  },
  {
    title: 'Nested Groups',
    pages: [
      {
        title: 'Nested vertical sortable', page: Nested, url: getUrl('nested.tsx')
      },
      // {
      //   title: 'Drag-drop between parent/child', page: NestedGroup, url: getUrl('nested-group.tsx')
      // }
    ]
  },
  {
    title: 'Advanced options',
    pages: [
      {
        title: 'Lock axis', page: LockAxis, url: getUrl('lock-axis.tsx')
      },
      {
        title: 'Drag begin delay of 500ms', page: DragDelay, url: getUrl('drag-delay.tsx')
      },
      {
        title: 'Drag handle', page: DragHandle, url: getUrl('drag-handle.tsx')
      },
      {
        title: 'Drag and Drop classses', page: DragClass, url: getUrl('drag-class.tsx')
      },
      {
        title: 'Animation duration 500ms', page: TransitionDuration, url: getUrl('transition-duration.tsx')
      },
      // {
      //   title: 'Dynamic add/remove Containers', page: DynamicContainers, url: getUrl('dynamic-containers.tsx')
      // }
    ]
  }
];
