import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useState, useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

import {
  ArticleStateType,
  defaultArticleState,
  backgroundColors,
  contentWidthArr,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
  OptionType,
} from '../../constants/articleProps';

type ArticleParamsFormProps = {
  onSubmit: (articleState: ArticleStateType) => void;
  onReset: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
  const paramsFormRef = useRef(null);

  const [isParamsFormOpen, setIsParamsFormOpen] = useState(false);

  useClickOutside(paramsFormRef, () => {
    setIsParamsFormOpen(false);
  });

  const [formState, setFormState] = useState(defaultArticleState);

  const handleResetForm = () => {
    setFormState(defaultArticleState);

    props.onReset();
  };

  const handleChange = (type: keyof ArticleStateType, value: OptionType) => {
    setFormState({
      ...formState,
      [type]: value,
    });
  };

  const submitForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    props.onSubmit(formState);
  };

  return (
    <>
      <ArrowButton
        isOpen={isParamsFormOpen}
        onClick={() => setIsParamsFormOpen(!isParamsFormOpen)}
      />
      <aside
        ref={paramsFormRef}
        className={clsx(
          styles.container,
          isParamsFormOpen && styles['container_open']
        )}>
        <form className={styles.form}>
          <Text as='h1' size={31} weight={800} uppercase dynamic={false}>
            Задайте параметры
          </Text>

          <div className={styles.paramsBlock}>
            <Select
              selected={formState.fontFamilyOption}
              onChange={(value) => handleChange('fontFamilyOption', value)}
              options={fontFamilyOptions}
              title='Шрифт'
            />
            <RadioGroup
              selected={formState.fontSizeOption}
              name='radio'
              onChange={(value) => handleChange('fontSizeOption', value)}
              options={fontSizeOptions}
              title='размер шрифта'
            />
            <Select
              selected={formState.fontColor}
              onChange={(value) => handleChange('fontColor', value)}
              options={fontColors}
              title='цвет шрифта'
            />
          </div>

          <div className={styles.divider} />

          <div className={styles.paramsBlock}>
            <Select
              selected={formState.backgroundColor}
              onChange={(value) => handleChange('backgroundColor', value)}
              options={backgroundColors}
              title='цвет фона'
            />
            <Select
              selected={formState.contentWidth}
              onChange={(value) => handleChange('contentWidth', value)}
              options={contentWidthArr}
              title='ширина контента'
            />
          </div>

          <div className={styles.bottomContainer}>
            <Button onClick={handleResetForm} title='Сбросить' type='reset' />
            <Button onClick={submitForm} title='Применить' type='submit' />
          </div>
        </form>
      </aside>
    </>
  );
};
