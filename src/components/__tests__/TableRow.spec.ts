import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import TableRow from '../Table/TableRow.vue';

// @FIXME: Test not properly rendering
describe('TableRow', () => {
  it('renders properly', () => {
    const wrapper = mount(TableRow, {
      props: {
        id: 'titleNumber',
        entries: [{ name: 'Jose' }],
        columnkeys: ['name'],
      },
    });
    expect(wrapper.text()).toContain('Jose');
  });
});
