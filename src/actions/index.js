// Re-export Redux Toolkit actions for backward compatibility
import { updateCurrentUser } from '../reducers/current-user-reducer';
import { setAdmin, clearAdmin } from '../reducers/admin-reducer';

export const seeLanding = () => ({
  type: 'SEE_LANDING'
});
export const hideLanding = () => ({
  type: 'HIDE_LANDING'
});
export const seeForm = () => ({
  type: 'SEE_FORM'
});

// Use Redux Toolkit actions
export { updateCurrentUser };
export const isAdmin = () => setAdmin(); // Map old action to new one
export const clearAdminAction = clearAdmin; // Export for future use

// Import and re-export Redux Toolkit selectedItem actions
import { setSelectedItem, clearSelectedItem } from '../reducers/selected-item-reducer';
export { setSelectedItem, clearSelectedItem };
// Map old action to new one for backward compatibility
export const selectedItem = (item) => setSelectedItem(item);
export const editItem = () => ({
  type: 'EDIT_ITEM'
  
});
