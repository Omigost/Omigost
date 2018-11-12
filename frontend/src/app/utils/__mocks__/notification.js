
let notificationSystem = null;

export default {
  setTarget: function(ref) {
    if(!ref) return;
    notificationSystem = ref;
  },
  show: function(message, level) {
    if(!notificationSystem) return;
    notificationSystem.addNotification({
      message,
      level
    });
  }
}