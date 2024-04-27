import { useSearchParams } from "react-router-dom";

export default function Filter(props) {
  const [param, setParams] = useSearchParams();

  return (
    <div className="search__check">
      <div className="search__check-container">
        {/* toggle switch -  isCheck={isCheck} */}
        <input
          {...props}
          type="checkbox"
          id="switch"
          checked={!!param.get(props.name)}
          onChange={(e) => {
            const { checked } = e.target;
            setParams(
              (params) => {
                if (checked) {
                  params.set(props.name, "true");
                } else {
                  params.delete(props.name);
                }
                return params;
              },
              { replace: true }
            );
          }}
        />
        <label
          htmlFor="switch"
          className={`search__check-svg-circle ${
            !param.get(props.name) ? "search__check-svg-circle_active" : ""
          }`}
          type="checkbox"
        >
          Toggle
        </label>
      </div>
      <span className="search__check-text">Короткометражки</span>
    </div>
  );
}
