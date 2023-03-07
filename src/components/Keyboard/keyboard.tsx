import './keyboard.scss';
import Button from './button';
import { ButtonSize, TextAlign } from './button/button';

interface KeyboardProps {
  emitter: Function;
}

function Keyboard(props: KeyboardProps) {
  const { emitter } = props;

  return (
    <div className='keyboard'>
      <div className='keyboard_setting'>
        <Button
          size={ButtonSize.Small}
          text='暂停(P)'
          color='#2dc421'
          className='keyboard_setting_button'
          event='pause'
          callback={emitter}
        />
        <Button
          size={ButtonSize.Small}
          text='重玩(R)'
          color='#dd1a1a'
          className='keyboard_setting_button'
          event='restart'
          callback={emitter}
        />
      </div>
      <Button
        size={ButtonSize.Large}
        text='掉落(SPACE)'
        className='keyboard_start'
        event='drop'
        callback={emitter}
      />
      <div className='keyboard_control'>
        <Button
          text='旋转'
          textAlign={TextAlign.Right}
          className='keyboard_control_middel'
          style={{margin: '0 0 40px 0'}}
          event='spin'
          callback={emitter}
        />
        <Button
          text='左移'
          className='keyboard_control_left'
          event='moveLeft'
          callback={emitter}
        />
        <Button
          text='右移'
          className='keyboard_control_right'
          event='moveRight'
          callback={emitter}
        />
        <Button
          text='下移'
          className='keyboard_control_middel'
          event='moveDown'
          callback={emitter}
        />
      </div>
    </div>
  )
}

export default Keyboard;