import Input from "../Input/Input";

export function UsernameInput(props) {
  return (
    <Input
      {...props}
      name="name"
      type="text"
      title="Имя"
      placeholder={"Имя"}
      minLength="2"
      maxLength="20"
      autoComplete="name"
      pattern="[[a-zA-Zа-яА-ЯёЁ]][a-zA-Zа-яА-ЯёЁ\s\-]+"
    />
  );
}

export function EmailInput(props) {
  return (
    <Input
      {...props}
      name="email"
      type="email"
      placeholder={"Email"}
      autoComplete="email"
      pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"  // было - ".+\.ru$" '(ru||com)'
    />
  );
}
