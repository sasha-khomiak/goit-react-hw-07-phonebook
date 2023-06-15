// Імпортуємо стилізований компонент
import { Input } from './Filter.styled';

// useSelector для отримання глобального стейту фільтра
// useDispatch для прокидання екшену в редʼюс і запису в стейт
import { useSelector, useDispatch } from 'react-redux';

// функція формування екшен перезапису фільтра в стейті
import { editFilter } from 'redux/filterSlice';

// селектор для фільтра
import { selectFilter } from 'redux/selectors';

// компонент Filter
const Filter = () => {
  //отримаємо значення голбального стейту параметра filter
  const value = useSelector(selectFilter);
  // dispatch для закидання для редʼюса обʼєкта екшена
  const dispatch = useDispatch();

  // ф-ія обробник зміни в інпуті фільтра
  //перезаписує значення filter в глобальному стейті при кожному виникненні екшена
  const handleChangeFilter = e => {
    dispatch(editFilter(e.currentTarget.value));
  };

  return (
    <>
      <Input onChange={handleChangeFilter} value={value} />
    </>
  );
};

export default Filter;
