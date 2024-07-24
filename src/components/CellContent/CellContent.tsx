import Items from '../Items/Items.tsx';

import styles from './CellContent.module.scss';

function CellContent({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className={styles['content']}>
      <div className={styles['toolbar']}>
        <h1 className={styles['item-title']}>{title}</h1>
        {children}
        <hr className={styles['hr']} />
      </div>
      <Items />
    </div>
  );
}

export default CellContent;
