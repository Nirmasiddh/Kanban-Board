
const delay = () => {
  const randomDelay = Math.floor(Math.random() * 1000) + 1000; 
  return new Promise((resolve) => setTimeout(resolve, randomDelay));
};

const shouldFail = () => {
  return Math.random() < 0.2;
};

export const mockApi = {
  addTask: async (task) => {
    await delay();
    if (shouldFail()) {
      throw new Error('Failed to add task');
    }
    return { success: true, task };
  },

  moveTask: async (taskId, newStatus) => {
    await delay();
    if (shouldFail()) {
      throw new Error('Failed to move task');
    }
    return { success: true, taskId, newStatus };
  },

  deleteTask: async (taskId) => {
    await delay();
    if (shouldFail()) {
      throw new Error('Failed to delete task');
    }
    return { success: true, taskId };
  },
};