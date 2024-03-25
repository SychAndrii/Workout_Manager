/**
 * An abstract class representing a factory for creating workout component instances.
 * This class defines a standard interface for component factories and should be extended
 * by specific factory implementations that create various workout components.
 *
 * The getComponent method is intended to be overridden in subclasses to return
 * specific component instances based on the provided parameters or context.
 */
class ComponentFactory {
    /**
     * Abstract method that should be implemented by subclasses to return
     * a specific component instance.
     * 
     * @throws {Error} Throws an error if called directly on the abstract class, indicating
     * that this method should be implemented by subclasses.
     */
    getComponent() {
        throw new Error('ComponentFactory is an abstract class!');
    }
}

export default ComponentFactory;
