document.addEventListener("DOMContentLoaded", function () {

    configurarProjetos();
    configurarFormulario();
    configurarModal();
    restaurarCadastro();

});


/* =========================
   PROJETOS
========================= */

function configurarProjetos() {

    const botoes = document.querySelectorAll(".projeto-btn");
    const toast = document.getElementById("toast");

    botoes.forEach(function (botao) {

        botao.addEventListener("click", function () {

            if (!toast) {
                return;
            }

            const projeto = botao.dataset.projeto;

            toast.textContent =
                "Você selecionou: " + projeto;

            toast.classList.add("mostrar");

            setTimeout(function () {
                toast.classList.remove("mostrar");
            }, 3000);

        });

    });

}


/* =========================
   FORMULÁRIO
========================= */

function configurarFormulario() {

    const formulario =
        document.getElementById("formCadastro");

    if (!formulario) {
        return;
    }

    const campos =
        formulario.querySelectorAll("input");


    campos.forEach(function (campo) {

        campo.addEventListener("input", function () {
            validarCampo(campo);
        });

        campo.addEventListener("blur", function () {
            validarCampo(campo);
        });

    });


    formulario.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            let formularioValido = true;


            campos.forEach(function (campo) {

                if (!validarCampo(campo)) {
                    formularioValido = false;
                }

            });


            const feedback =
                document.getElementById(
                    "feedbackFormulario"
                );


            if (!formularioValido) {

                feedback.style.display = "block";

                feedback.style.background =
                    "#fde8e8";

                feedback.style.color =
                    "#8a1c1c";

                feedback.textContent =
                    "Verifique os campos destacados.";

                return;
            }


            const dados =
                Object.fromEntries(
                    new FormData(formulario).entries()
                );


            localStorage.setItem(
                "ongEsperancaCadastro",
                JSON.stringify(dados)
            );


            feedback.style.display = "block";

            feedback.className =
                "alerta sucesso-alerta";

            feedback.textContent =
                "Cadastro realizado com sucesso!";


            const modal =
                document.getElementById("modal");


            if (modal) {
                modal.hidden = false;
            }

        }
    );


    formulario.addEventListener(
        "reset",
        function () {

            setTimeout(function () {

                campos.forEach(function (campo) {

                    campo.classList.remove(
                        "valido",
                        "invalido"
                    );


                    const erro =
                        document.getElementById(
                            "erro" +
                            campo.id
                                .charAt(0)
                                .toUpperCase() +
                            campo.id.slice(1)
                        );


                    if (erro) {
                        erro.textContent = "";
                    }

                });


                const feedback =
                    document.getElementById(
                        "feedbackFormulario"
                    );


                if (feedback) {

                    feedback.style.display =
                        "none";

                    feedback.textContent =
                        "";

                }

            }, 0);

        }
    );

}


/* =========================
   VALIDAÇÃO
========================= */

function validarCampo(campo) {

    const nomeErro =
        "erro" +
        campo.id.charAt(0).toUpperCase() +
        campo.id.slice(1);


    const erro =
        document.getElementById(nomeErro);


    if (campo.value.trim() === "") {

        campo.classList.remove("valido");

        campo.classList.add("invalido");


        if (erro) {

            erro.textContent =
                "Este campo é obrigatório.";

        }

        return false;

    }


    if (
        campo.type === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            campo.value
        )
    ) {

        campo.classList.remove("valido");

        campo.classList.add("invalido");


        if (erro) {

            erro.textContent =
                "Digite um e-mail válido.";

        }

        return false;

    }


    if (
        campo.id === "cpf" &&
        !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(
            campo.value
        )
    ) {

        campo.classList.remove("valido");

        campo.classList.add("invalido");


        if (erro) {

            erro.textContent =
                "Digite o CPF no formato correto.";

        }

        return false;

    }


    if (
        campo.id === "telefone" &&
        !/^\(\d{2}\)\s\d{5}-\d{4}$/.test(
            campo.value
        )
    ) {

        campo.classList.remove("valido");

        campo.classList.add("invalido");


        if (erro) {

            erro.textContent =
                "Digite o telefone no formato correto.";

        }

        return false;

    }


    if (
        campo.id === "cep" &&
        !/^\d{5}-\d{3}$/.test(
            campo.value
        )
    ) {

        campo.classList.remove("valido");

        campo.classList.add("invalido");


        if (erro) {

            erro.textContent =
                "Digite o CEP no formato correto.";

        }

        return false;

    }


    campo.classList.remove("invalido");

    campo.classList.add("valido");


    if (erro) {
        erro.textContent = "";
    }


    return true;

}


/* =========================
   LOCAL STORAGE
========================= */

function restaurarCadastro() {

    const formulario =
        document.getElementById("formCadastro");


    if (!formulario) {
        return;
    }


    const dadosSalvos =
        localStorage.getItem(
            "ongEsperancaCadastro"
        );


    if (!dadosSalvos) {
        return;
    }


    try {

        const dados =
            JSON.parse(dadosSalvos);


        Object.entries(dados).forEach(
            function ([campo, valor]) {

                const elemento =
                    formulario.elements.namedItem(
                        campo
                    );


                if (elemento) {
                    elemento.value = valor;
                }

            }
        );

    } catch (erro) {

        console.error(
            "Erro ao recuperar cadastro:",
            erro
        );

    }

}


/* =========================
   MODAL
========================= */

function configurarModal() {

    const modal =
        document.getElementById("modal");


    if (!modal) {
        return;
    }


    const fechar =
        document.getElementById(
            "fecharModal"
        );


    const confirmar =
        document.getElementById(
            "okModal"
        );


    function fecharModal() {
        modal.hidden = true;
    }


    if (fechar) {

        fechar.addEventListener(
            "click",
            fecharModal
        );

    }


    if (confirmar) {

        confirmar.addEventListener(
            "click",
            fecharModal
        );

    }


    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {
                fecharModal();
            }

        }
    );


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                !modal.hidden
            ) {

                fecharModal();

            }

        }
    );

}