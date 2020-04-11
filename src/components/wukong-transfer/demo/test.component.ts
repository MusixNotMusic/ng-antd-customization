import { Component, OnInit } from '@angular/core';
declare const window: any;
const options = [
  {
    value: 'zhejiang',
    label: 'ZhejiangZhejiangZhejiangZhejiangZhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
            isLeaf: true
          },
          {
            value: 'QQ',
            label: 'QQ',
            isLeaf: true
          }
        ]
      },
      {
        value: 'ningbo',
        label: 'Ningbo',
        isLeaf: true
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
            isLeaf: true
          },
          {
            value: 'BBQ',
            label: 'BBQ',
            isLeaf: true
          }
        ]
      },
      {
        value: 'AA',
        label: 'AA',
        children: [
          {
            value: 'CC',
            label: 'CC',
            isLeaf: true
          },
          {
            value: 'DD',
            label: 'DD',
            isLeaf: true
          }
        ]
      }
    ]
  }
];


const provinces = [
  {
    value: 'zhejiang',
    label: 'Zhejiang'
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu'
  }
];


const cities: { [key: string]: Array<{ value: string; label: string; isLeaf?: boolean }> } = {
  zhejiang: [
    {
      value: 'hangzhou',
      label: 'Hangzhou'
    },
    {
      value: 'ningbo',
      label: 'Ningbo',
      isLeaf: true
    }
  ],
  jiangsu: [
    {
      value: 'nanjing',
      label: 'Nanjing'
    },
    {
      value: 'AA',
      label: 'AA'
    }
  ]
};

const scenicspots: { [key: string]: Array<{ value: string; label: string; isLeaf?: boolean }> } = {
  hangzhou: [
    {
      value: 'xihu',
      label: 'West Lake',
      isLeaf: true
    }
  ],
  nanjing: [
    {
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
      isLeaf: true
    },
    {
      value: 'QQ',
      label: 'QQ',
      isLeaf: true
    }
  ],
  AA: [
    {
      value: 'OPS',
      label: 'LOOK',
      isLeaf: true
    },
    {
      value: 'janter',
      label: 'QQFC',
      isLeaf: true
    }
  ]
};
let countr = 0;
@Component({
  selector: 'test-root',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {
  nzOptions: any | null = null;
  values: string[] = ['zhejiang', 'hangzhou', 'xihu'];
  values1: any[] = [['zhejiang', 'hangzhou', 'xihu'], ['jiangsu', 'AA', 'OPS'], ['jiangsu', 'nanjing', 'QQ']];
  checked: false;
  searchColumnsIndex = [true, true, true];
  searchText = ["", "", ""];

  selectOptions = [
    { name: '事务A', id: 1 },
    { name: '事务B', id: 2 },
    { name: '事务C', id: 3 },
    { name: '事务D', id: 4 },
    { name: '事务E', id: 5 },
    { name: '事务F', id: 6 },
  ];
  selectCache = {};
  list = [
  ];
  list1 = this.genarateSelectedOption();
  selectLabel = 'name';
  selectValue = 'id';
  // lebel = 'name';
  // value = 'id';
  onChanges(values: string[]): void {
    console.log(values, this.values);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.nzOptions = options;
    }, 500);
    window.test1 = this;
  }
  
  checkedChange($event) {
    console.log(this.checked);
  }

  /** load data async execute by `nzLoadData` method */
  loadData(node: any, index: number): PromiseLike<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (index < 0) {
          // if index less than 0 it is root node
          node.children = provinces;
        } else if (index === 0) {
          node.children = cities[node.value];
        } else {
          node.children = scenicspots[node.value];
        }
        resolve();
      }, 1000);
    });
  }

  selectOptionChange(option) {
    console.log('test test ===>', this.selectCache);
    if(!this.selectCache.hasOwnProperty(option.id)) {
      let data = this.genarateSelectedOption();
      console.log('selectOptionChange ==>', data);
      this.selectCache[option.id] = data;
    }
    this.list = this.selectCache[option.id];
  }
  
  genarateSelectedOption () {
    countr = 0;
    return Array(10).fill(1).map((item) => {
      return {
        value: countr++,
        label: Math.random().toString(36).substr(2),
        checked: false
      }
    })
  }

  selected(option) {
    console.log('selected ==>', option);
  }
}
