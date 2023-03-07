import './panel.scss';

interface PanelProps {
  className?: string;
  points: number;
  clearedLines: number;
  level: number;
  nextBlock: number
}

function Panel(props: PanelProps) {
  const panel_classes = props.className ? 'panel ' + props.className: 'panel';
  
  const { points, clearedLines, level, nextBlock } = props;

  return (
    <div className={panel_classes}>
      <p>最高分</p>
      <p>{points}</p>
      <p>消除行</p>
      <p>{clearedLines}</p>
      <p>级别</p>
      <p>{level}</p>
      <p>下一个</p>
      <p>{nextBlock}</p>
    </div>
  )
}

export default Panel;