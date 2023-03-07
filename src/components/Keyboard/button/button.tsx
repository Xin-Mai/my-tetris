import classNames from 'classnames';
import { CSSProperties } from 'react';
import './button.scss';

export enum TextAlign {
  Top = 1,
  Right,
  Buttom,
  Left,
};

export enum ButtonShape {
  Circle = 1,
  Rect,
};

export enum ButtonSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
};

interface ButtonProps {
  event?: string;
  callback?: Function;
  size?: ButtonSize;
  text?: string;
  textAlign?: TextAlign;
  color?: string;
  shape?: ButtonShape;
  className?: string;
  style?: CSSProperties;
}

function Button(props: ButtonProps) {
  const {
    size = ButtonSize.Medium,
    shape = ButtonShape.Circle,
    text = 'button',
    textAlign = TextAlign.Buttom,
    color = '#5a65f1',
    className = '',
    style,
    callback,
    event = '',
  } = props;

  return (
    <div style={style} className={classNames({
      'basic-button_container': true,
      'basic-button-large': size === ButtonSize.Large,
      'basic-button-medium': size === ButtonSize.Medium,
      'basic-button-small': size === ButtonSize.Small,
      [className]: true,
    })}>
      <div className={classNames({
          'basic-button': true,
          'basic-button-circle': shape === ButtonShape.Circle,
          'basic-button-rect': shape === ButtonShape.Rect,
        })}
        style={{background: color}}
        onClick={(e) => {
          if (callback) {
            callback(event, e);
          }
        }}
      >
      </div>
      <p className={classNames({
        'basic-button-text': true,
        'basic-button-text_top': textAlign === TextAlign.Top,
        'basic-button-text_left': textAlign === TextAlign.Left,
        'basic-button-text_right': textAlign === TextAlign.Right,
        })}>{text}</p>
    </div>
  );
}

export default Button;