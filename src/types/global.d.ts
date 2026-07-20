export { };

declare global {
    /** Strictly an unsigned int, but it's just a `number` under the hood. */
    type unsigned = number;

    /** Strictly an integer, but it's just a `number` under the hood. */
    type integer = number;

    /** Strictly a float, but it's just a `number` under the hood. */
    type float = number;
}