import { Component, OnInit, Input, Output,  EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import _ from 'lodash-es';
import { itemSettingBean } from 'app/routes/server/deploy-manager/bean/itemSetting';
declare const window: any;
@Component({
  selector: 'wukong-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.less']
})
export class WukongTransferComponent implements OnInit, OnChanges {

  @Input() selectOptions: any;
  @Input() selectLabel: string = 'label';
  @Input() selectValue: string = 'value';
  @Input() list = [];
  @Input() liLabel: string = 'label';
  @Input() liVelue: string = 'value';
  @Input() public selectOption: any;
  @Input() public ngStyle: any;
  @Output() readonly selectOptionChange = new EventEmitter<any>();
  @Output() readonly selected = new EventEmitter<any>();
  @Output() readonly searchLeft = new EventEmitter<any>();

  public searchLeftText: string = '';
  public searchResult = { data: this.list }; // search 过滤之后
  public searchRightText: string = '';
  public checkedLeftAll: boolean = true;
  public checkedRightAll: boolean = true;
  public selectedList = [];

  public hasLeftChecked: boolean = false;
  public hasRightChecked: boolean = false;
  public disableLeft: boolean = false;
  public disableRight: boolean = false;
  public selectedCollections = {};

  public allowAdd: boolean = false;
  constructor() { }

  ngOnInit(): void {
    window.transfer = this;
    console.log('ngOnInit ==>', this.selectValue, this.selectLabel, this.liLabel, this.liVelue );
    if(this.selectOptions && this.selectOption) {
      this.selectOptionChange.emit(this.selectOption);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('123123 ngOnChanges', changes);
    if(changes.list) {
      this.afterSelectOptionUpdate();
    }
  }

  selectOptionChangeHandle(option) {
    console.log('selectOptionChangeHandle ===>', this.selectOption, option);
    this.selectOption = option;
    this.selectOptionChange.emit(this.selectOption);
  }

  afterSelectOptionUpdate() {
    console.log('afterSelectOptionUpdate', this.selectOption, this.list);
    let key;
    if(!this.selectOptions) {
      key = 'single';
    } else {
      if(!this.selectOption) return;
      key = this.selectOption[this.selectValue]; 
    }
    // 设置空集合
    if(!this.selectedCollections.hasOwnProperty(key)) {
      this.selectedCollections[key] = [];
    } 
    this.selectedList = this.selectedCollections[key];
    // 对比
    this.comparySourceAndSelected(this.list, this.selectedList);

    // 设置全选
    // this.setCheckedAll();
    this.searchLeftChange();
  }


  comparySourceAndSelected(source, selected) {
    if(selected.length < 1) { return; }
    _.pullAllBy(source, selected, this.liVelue)
  }

  checkboxLeftClick(row) {
    row.checked = !row.checked;
    this.leftArrowHighlight();
    this.leftCheckedAll();
  }

  checkboxRightClick(row) {
    row.checked = !row.checked;
    this.rightArrowHighlight();
    this.rightCheckedAll();
  }

  checkboxLeftAllClick() {
    if(this.list.length === 0) return;
    this.checkedLeftAll = !this.checkedLeftAll;
    _.each(this.list, (item) => {
      if(!item.hide) {
        item.checked = this.checkedLeftAll;
      }
    });
    this.hasLeftChecked = this.checkedLeftAll;
  }

  checkboxRightAllClick() {
    if(this.selectedList.length === 0) return;
    this.checkedRightAll = !this.checkedRightAll;
    _.each(this.selectedList, (item) => {
      if(!item.hide) {
        item.checked = this.checkedRightAll;
      }
    });
    this.hasRightChecked = this.checkedRightAll;
  }

  rightArrowHighlight() {
    let checkedLen = _.size(_.filter(this.selectedList, (item) => { return !item.hide && item.checked}));
    this.hasRightChecked = checkedLen > 0;
  }

  leftArrowHighlight() {
    let checkedLen = _.size(_.filter(this.list, (item) => { return !item.hide && item.checked}));
    this.hasLeftChecked = checkedLen > 0;
  }

  rightCheckedAll() {
    let len = 0, checkedLen = 0;
    _.forEach(this.selectedList, (item) => {
      if(!item.hide) {
        len ++;
        if(item.checked) {
          checkedLen++;
        }
      }
    })
    if(len === 0) {
      this.checkedRightAll = false;
      this.disableRight = true;
    } else {
      this.disableRight = false;
      this.checkedRightAll = len === checkedLen;
    }
  }

  leftCheckedAll() {
    let len = 0, checkedLen = 0;
    _.forEach(this.list, (item) => {
      if(!item.hide) {
        len ++;
        if(item.checked) {
          checkedLen++;
        }
      }
    })
    if(len === 0 ) {
      this.disableLeft = true;
      this.checkedLeftAll = false;
    } else {
      this.disableLeft = false;
      this.checkedLeftAll = len === checkedLen;
    }
  }

  moveToRightClick() {
    let checkeds = _.remove(this.list, item => !item.hide && item.checked);
    _.forEach(checkeds, (item) =>  { 
      item.checked = false;
      item.hide = true;
      this.selectedList.push(item); 
    });
    this.setSelectedCollections(this.selectedList);
    // this.hasLeftChecked = false;
    // this.setCheckedAll();
    this.searchRightChange();
    this.selected.emit(this.selectOptions ? this.selectedCollections : this.selectedCollections['single']);
  }

  moveToLeftClick() {
    let checkeds = _.remove(this.selectedList, item => !item.hide && item.checked);
    _.forEach(checkeds, (item) => {
      item.checked = false;
      item.hide = true;
      this.list.push(item);
    }) 
    // this.hasRightChecked = false;
    // this.setCheckedAll();
    this.searchLeftChange();
    this.selected.emit(this.selectOptions ? this.selectedCollections : this.selectedCollections['single']);
  }

  setSelectedCollections(selectedList) {
    let value = this.selectOptions ? this.selectOption[this.selectValue] : 'single';
    this.selectedCollections[value] = selectedList;
  }

  setCheckedAll() {
    this.rightCheckedAll();
    this.leftCheckedAll();
  }

  searchLeftChange() {
    if(_.isEmpty(this.searchLeftText)){
      _.each(this.list, (item) => { item.hide = false; });
    } else {
      _.each(this.list, (item) => {
          item.hide = !_.includes(item[this.liLabel], this.searchLeftText);
      })
    }
    this.leftArrowHighlight();
    this.leftCheckedAll();
    this.rightArrowHighlight();
    this.rightCheckedAll();
    // 是否可以添加 数据
    this.openAddItem();
  }

  searchRightChange() {
    console.log('searchRightChange ==>', this.searchRightText);
    if(_.isEmpty(this.searchRightText)) {
      _.each(this.selectedList, (item) => { item.hide = false; });
    } else {
      _.each(this.selectedList, (item) => {
          item.hide = !_.includes(item[this.liLabel], this.searchRightText);
      })
    }
    this.leftArrowHighlight();
    this.leftCheckedAll();
    this.rightArrowHighlight();
    this.rightCheckedAll();
  }

  openAddItem() {
    let len = 0;
    _.forEach(this.list, (item) => {
      if(!item.hide) {
        len ++;
      }
    })
    this.allowAdd = len == 0;
  }

  addItemToList() {
    if(!_.isEmpty(this.searchLeftText)) {
      this.list.push({[this.liLabel]: this.searchLeftText, [this.liVelue]: 'temp', checked: false});
    }
  }
}
