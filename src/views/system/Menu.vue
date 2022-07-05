<template>
  <page-container>
    <a-table :columns="columns" :data-source="data">
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'action'">
          <span>
            <a>编辑</a>
            <a-divider type="vertical" />
            <a>删除</a>
          </span>
        </template>
      </template>
    </a-table>
  </page-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
const columns = [
  {
    title: '权限名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '权限唯一键',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: '菜单图标',
    dataIndex: 'icon',
    key: 'icon',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
  },
];

interface DataItem {
  name: string;
  key: string;
  icon: string;
  sort: number;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    name: '仪表盘',
    key: 'dashboard',
    icon: 'test',
    sort: 1000,
    children: [
      {
        name: '分析页',
        key: 'page1',
        icon: 'test',
        sort: 1001,
      },
      {
        name: '监控页',
        key: 'page2',
        icon: 'test',
        sort: 1002,
      },
    ],
  },
  {
    name: '系统管理',
    key: 'system',
    icon: 'test',
    sort: 2000,
  },
];

export default defineComponent({
  setup() {
    return {
      data,
      columns,
    };
  },
});
</script>
