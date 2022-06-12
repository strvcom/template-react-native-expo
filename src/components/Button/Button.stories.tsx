import type { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import Button from './Button'

const story: ComponentMeta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    onPress: { action: 'onPress' },
  },
}

export default story
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  text: 'Button',
}

export const LongLabel = Template.bind({})
LongLabel.args = {
  text: 'Long Label',
  variant: 'medium',
}

export const Small = Template.bind({})
Small.args = {
  text: 'Yo',
  variant: 'small',
}
