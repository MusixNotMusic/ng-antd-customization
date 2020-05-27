import { Component, OnInit } from '@angular/core';

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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  nzOptions: any | null = null;
  values: string[] = ['zhejiang', 'hangzhou', 'xihu'];
  values1: any[] = [['zhejiang', 'hangzhou', 'xihu'], ['jiangsu', 'AA', 'OPS'], ['jiangsu', 'nanjing', 'QQ']];
  checked: false;
  searchColumnsIndex = [false, true, true];
  searchText = ["", "", ""];
  public selectedDestination: string;
  onChanges(values: string[]): void {
    console.log(values, this.values);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.nzOptions = options;
    }, 500);
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
}
