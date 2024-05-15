import React, { FC, memo } from 'react';
import styles from './ingredient-details.module.css';
import { IngredientDetailsUIProps } from './type';

export const IngredientDetailsUI: FC<IngredientDetailsUIProps> = memo(
  ({ ingredientData }) => {
    const { name, image_large, calories, proteins, fat, carbohydrates } =
      ingredientData;

    return (
      <div className={styles.content}>
        <img
          className={styles.img}
          alt='изображение ингредиента.'
          src={image_large}
          data-cy='image_large'
        />
        <h3 className='text text_type_main-medium mt-2 mb-4' data-cy='name'>
          {name}
        </h3>
        <ul className={`${styles.nutritional_values} text_type_main-default`}>
          <li className={styles.nutritional_value}>
            <p className={`text mb-2 ${styles.text}`}>Калории, ккал</p>
            <p className={`text text_type_digits-default`} data-cy='calories'>
              {calories}
            </p>
          </li>
          <li className={styles.nutritional_value}>
            <p className={`text mb-2 ${styles.text}`}>Белки, г</p>
            <p className={`text text_type_digits-default`} data-cy='proteins'>
              {proteins}
            </p>
          </li>
          <li className={styles.nutritional_value}>
            <p className={`text mb-2 ${styles.text}`}>Жиры, г</p>
            <p className={`text text_type_digits-default`} data-cy='fat'>
              {fat}
            </p>
          </li>
          <li className={styles.nutritional_value}>
            <p className={`text mb-2 ${styles.text}`}>Углеводы, г</p>
            <p
              className={`text text_type_digits-default`}
              data-cy='carbohydrates'
            >
              {carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    );
  }
);
