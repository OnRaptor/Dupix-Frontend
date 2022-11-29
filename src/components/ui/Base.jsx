export const BaseElement = (props) => {
    return `
      background: transparent;
      color: ${props.theme.colors.accent};
      border-width: 1px;
      border-style: solid;
      border-radius: 15px;
      border-color: ${props.theme.colors.primary};
      padding: 5px 15px 5px 15px;
      margin: 3px;
      font-size: 20px;
      width: ${props.width || 'auto'};
`
}