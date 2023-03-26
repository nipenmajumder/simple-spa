export default {
    data() {
        return {

        };
    },
    methods: {
        routeName(name) {
            return route(name);
        },
        newTab(url) {
            window.open(url, '_blank');
        },
        reload(time) {
            setTimeout(() => {
                window.location.reload();
            },time);
        },
        capitalize(event) {
            return event.target.value.replace(/(?:^|\s)\S/g, function (a) {
                return a.toUpperCase();
            });
        },
        playSound: function () {
            let sound = '/audio/error.mp3';
            let audio = new Audio(sound);
            audio.play();
        },
        formReset: function (form) {
            Object.keys(form).forEach(function (key, index) {
                form[key] = '';
            });
        },
        objectArrayReset: function (form) {
            Object.keys(form).forEach(function (key, index) {
                form[key] = [];
            });
        },
        objectValueReset: function (form) {
            Object.keys(form).forEach(function (key, index) {
                form[key] = '';
            });
        },
    }
};
