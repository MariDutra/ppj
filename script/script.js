document.addEventListener("DOMContentLoaded", async function() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const snap = document.getElementById('snap');
    const reutilizacaoInfo = document.getElementById('reutilizacaoInfo');
    const descarteInfo = document.getElementById('descarteInfo');

    const lixoInfo = {
        "paper": {
            "reutilizacao": "O papel pode ser reutilizado para fazer rascunhos ou artesanato.",
            "descarte": "O papel deve ser descartado em lixeiras de reciclagem de papel."
        },
        "plastic": {
            "reutilizacao": "O plástico pode ser reutilizado para fazer vasos de plantas ou organizadores.",
            "descarte": "O plástico deve ser descartado em lixeiras de reciclagem de plástico."
        },
        "pop bottle": {
            "reutilizacao": "O plástico pode ser reutilizado para fazer vasos de plantas ou organizadores.",
            "descarte": "O plástico deve ser descartado em lixeiras de reciclagem de plástico."
        },
        "metal": {
            "reutilizacao": "O metal pode ser reutilizado para fazer artesanato ou projetos de bricolagem.",
            "descarte": "O metal deve ser descartado em lixeiras de reciclagem de metal."
        },
        "glass": {
            "reutilizacao": "O vidro pode ser reutilizado para fazer jarros ou recipientes de armazenamento.",
            "descarte": "O vidro deve ser descartado em lixeiras de reciclagem de vidro."
        },
        "beer bottle": {
            "reutilizacao": "O vidro pode ser reutilizado para fazer jarros ou recipientes de armazenamento.",
            "descarte": "O vidro deve ser descartado em lixeiras de reciclagem de vidro."
        }
    };

    // Acessar a câmera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.srcObject = stream;
            video.play();
        }).catch(function(err) {
            console.error("Erro ao acessar a câmera: ", err);
        });
    }

    // Carregar o modelo MobileNet
    let model;
    try {
        model = await mobilenet.load();
        console.log("Modelo MobileNet carregado com sucesso");
    } catch (error) {
        console.error("Erro ao carregar o modelo MobileNet: ", error);
    }

    // Tirar foto e fazer a previsão
    snap.addEventListener('click', async function() {
        if (!model) {
            console.error("Modelo não carregado");
            return;
        }

        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const img = tf.browser.fromPixels(canvas);
        let predictions;
        try {
            predictions = await model.classify(img);
            console.log("Previsões: ", predictions);
        } catch (error) {
            console.error("Erro ao fazer a previsão: ", error);
        }
        
        img.dispose();
        
        if (predictions && predictions.length > 0) {
            const tipoLixo = predictions[0].className.split(",")[0].toLowerCase(); // Pega a primeira previsão e transforma em minúsculas
            console.log("Tipo de lixo identificado: ", tipoLixo);
            
            if (lixoInfo[tipoLixo]) {
                const reutilizacaoMensagem = lixoInfo[tipoLixo]["reutilizacao"];
                const descarteMensagem = lixoInfo[tipoLixo]["descarte"];
                
                // Exibir informações em um alert
                alert(`O ${tipoLixo} deve ser descartado em: ${descarteMensagem}\n\nO ${tipoLixo} pode ser reutilizado para: ${reutilizacaoMensagem}`);
                
                // Atualizar o conteúdo das divs
                reutilizacaoInfo.textContent = reutilizacaoMensagem;
                descarteInfo.textContent = descarteMensagem;
            } else {
                const mensagemErro = "Tipo de lixo não encontrado.";
                
                // Exibir erro em um alert
                alert(mensagemErro);
                
                // Atualizar o conteúdo das divs
                reutilizacaoInfo.textContent = mensagemErro;
                descarteInfo.textContent = mensagemErro;
            }
        } else {
            const mensagemErro = "Não foi possível identificar o tipo de lixo.";
            
            // Exibir erro em um alert
            alert(mensagemErro);
            
            // Atualizar o conteúdo das divs
            reutilizacaoInfo.textContent = mensagemErro;
            descarteInfo.textContent = mensagemErro;
        }
    });

    // Tabs
    window.openTab = function(evt, tabName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].style.backgroundColor = "";
        }
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.style.backgroundColor = '#777';
    }
});
