export interface RadioProps {
    /**
   * Id for input, same value will be used for htmlFor of the label
   */
  checkId: string,
  /**
   * Name for input
   */
  checkName?: string,
  /**
   * Value for input
   */
  checkValue?: string | number,
  /**
   * Label for the input
   */
  label?: string,
   /**
   * Is this input checked?
   */
   isChecked?: boolean,
  /**
   * Change handler
   */
  onChange?: (checkValue: string | number) => void,
}