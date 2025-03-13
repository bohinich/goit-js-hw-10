import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form");

    if (!form) {
        console.error("Форма не знайдена в HTML!");
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const delay = Number(form.elements.delay.value);
        const state = form.elements.state.value;

        console.log("Promise details:", { delay, state });

        createPromise(delay, state)
            .then((delay) => {
                iziToast.success({
                    title: "✅ Success",
                    message: `Fulfilled promise in ${delay}ms`,
                    position: "topRight",
                });
            })
            .catch((delay) => {
                iziToast.error({
                    title: "❌ Error",
                    message: `Rejected promise in ${delay}ms`,
                    position: "topRight",
                });
            });

        form.reset();
    });

    function createPromise(delay, state) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (state === "fulfilled") {
                    resolve(delay);
                } else {
                    reject(delay);
                }
            }, delay);
        });
    }
});
