import { CSSProperties } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
  ArticleStateType,
  defaultArticleState,
} from '../../constants/articleProps';

import clsx from 'clsx';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {
  const setStyleParams = (articleState: ArticleStateType) => {
    const mainNode = document.querySelector(`.${styles.main}`) as HTMLElement;

    if (!mainNode) {
      return;
    }

    mainNode.style.setProperty(
      '--font-family',
      articleState.fontFamilyOption.value
    );
    mainNode.style.setProperty(
      '--font-size',
      articleState.fontSizeOption.value
    );
    mainNode.style.setProperty('--font-color', articleState.fontColor.value);
    mainNode.style.setProperty(
      '--container-width',
      articleState.contentWidth.value
    );
    mainNode.style.setProperty(
      '--bg-color',
      articleState.backgroundColor.value
    );
  };

  const resetStyleParams = () => {
    setStyleParams(defaultArticleState);
  };

  return (
    <div
      className={clsx(styles.main)}
      style={
        {
          '--font-family': defaultArticleState.fontFamilyOption.value,
          '--font-size': defaultArticleState.fontSizeOption.value,
          '--font-color': defaultArticleState.fontColor.value,
          '--container-width': defaultArticleState.contentWidth.value,
          '--bg-color': defaultArticleState.backgroundColor.value,
        } as CSSProperties
      }>
      <ArticleParamsForm onSubmit={setStyleParams} onReset={resetStyleParams} />
      <Article />
    </div>
  );
};
