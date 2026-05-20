import { useDispatch, useSelector } from 'react-redux';

import { changeSortType } from '../../store/action';
import { State } from '../../store';

const sortTypes = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

function SortOptions(): JSX.Element {
  const dispatch = useDispatch();
  const activeSortType = useSelector((state: State) => state.sortType);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>

      <select
        className="places__sorting-type"
        value={activeSortType}
        onChange={(evt) => {
          dispatch(changeSortType(evt.target.value));
        }}
      >
        {sortTypes.map((sortType) => (
          <option key={sortType} value={sortType}>
            {sortType}
          </option>
        ))}
      </select>
    </form>
  );
}

export default SortOptions;
