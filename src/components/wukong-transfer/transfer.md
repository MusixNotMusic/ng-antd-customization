# wukong-transfer 穿梭框
|@Input|参数类型|默认值|描述|
|----|---|---|--|
|selectOptions| any| undefined |多层穿梭框时候 选择select功能|
|selectLabel| string| label |列表对象中 那个字段作为label|
|selectValue| string| value |列表对象中 那个字段作为label|
|list| array|[]|输入的item,作为穿梭框的数据li|
|liLabel| string | label | 作为list的显示字段|
|liValue| string |value| 作为list的value 字段|
|selectOption| any| undefined| selectOptions 选中值|
|ngStyle| object| undefined| 穿梭框 box 样式|


|@Outnput|参数类型|默认值|描述|
|----|---|---|--|
|selectOptionChange| EventEmitter| Function | 当selectOption change时候，触发事件|
|selected| EventEmitter| Function | 当选择li， 左右穿梭数据时，触发事件|
