import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import TableColumn from '../Table/TableColumn.vue';

describe('TableColumn', () => {
  it('renders properly', () => {
    const wrapper = mount(TableColumn, {
      props: {
        label: 'Jose',
      },
    });
    expect(wrapper.text()).toContain('Jose');
  });
});
