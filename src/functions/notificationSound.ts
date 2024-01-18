export default function notificationSound(error: boolean = false) {
    const notificationSound = new Audio(`/sounds/notification-sound-${+!error}.wav`);
    notificationSound.play()
}