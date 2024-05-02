import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useState } from 'react';
import {
  ArticleStateType,
  backgroundColors,
  contentWidthArr,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
  isParamsFormOpen: boolean;
  setIsParamsFormOpen: (value: boolean) => void;
  onSubmit: (articleState: ArticleStateType) => void;
  onReset: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
  const [selectedFont, setSelectedFont] = useState(fontFamilyOptions[0]);
  const [selectedFontSize, setSelectedFontSize] = useState(fontSizeOptions[0]);
  const [selectedFontColor, setSelectedFontColor] = useState(fontColors[0]);
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
    backgroundColors[0]
  );
  const [selectedContentWidth, setSelectedContentWidth] = useState(
    contentWidthArr[0]
  );

  const submitForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    props.onSubmit({
      fontFamilyOption: selectedFont,
      fontColor: selectedFontColor,
      backgroundColor: selectedBackgroundColor,
      contentWidth: selectedContentWidth,
      fontSizeOption: selectedFontSize,
    });
  };

  const resetForm = () => {
    setSelectedFont(fontFamilyOptions[0]);
    setSelectedFontSize(fontSizeOptions[0]);
    setSelectedFontColor(fontColors[0]);
    setSelectedBackgroundColor(backgroundColors[0]);
    setSelectedContentWidth(contentWidthArr[0]);

    props.onReset();
  };

  return (
    <>
      <ArrowButton
        isOpen={props.isParamsFormOpen}
        onClick={() => props.setIsParamsFormOpen(!props.isParamsFormOpen)}
      />
      <aside
        className={clsx(
          styles.container,
          props.isParamsFormOpen && styles['container_open']
        )}>
        <form className={styles.form}>
          <Text as='h1' size={31} weight={800} uppercase dynamic={false}>
            Задайте параметры
          </Text>

          <div className={styles.paramsBlock}>
            <Select
              selected={selectedFont}
              onChange={setSelectedFont}
              options={fontFamilyOptions}
              title='Шрифт'
            />
            <RadioGroup
              selected={selectedFontSize}
              name='radio'
              onChange={setSelectedFontSize}
              options={fontSizeOptions}
              title='размер шрифта'
            />
            <Select
              selected={selectedFontColor}
              onChange={setSelectedFontColor}
              options={fontColors}
              title='цвет шрифта'
            />
          </div>

          <div className={styles.divider} />

          <div className={styles.paramsBlock}>
            <Select
              selected={selectedBackgroundColor}
              onChange={setSelectedBackgroundColor}
              options={backgroundColors}
              title='цвет фона'
            />
            <Select
              selected={selectedContentWidth}
              onChange={setSelectedContentWidth}
              options={contentWidthArr}
              title='ширина контента'
            />
          </div>

          <div className={styles.bottomContainer}>
            <Button onClick={resetForm} title='Сбросить' type='reset' />
            <Button onClick={submitForm} title='Применить' type='submit' />
          </div>
        </form>
      </aside>
    </>
  );
};
