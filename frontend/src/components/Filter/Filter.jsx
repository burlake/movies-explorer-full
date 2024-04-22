export default function Filter({ isCheck, changeShort }) {
  return (

<div className="search__check">
          <div className="search__check-container">
            {/* toggle switch -  isCheck={isCheck} */}
            <input type="checkbox"id="switch"  onChange={ changeShort}  />
            <label
              htmlFor="switch"
              className={`search__check-svg-circle ${
                !isCheck ? "search__check-svg-circle_active" : ""
              }`}

              type='checkbox'

            >
              Toggle
            </label>
          </div>
          <span className="search__check-text">Короткометражки</span>
        </div>
  )
}
