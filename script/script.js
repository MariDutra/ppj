document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const snap = document.getElementById('snap');
    const reutilizacaoInfo = document.getElementById('reutilizacaoInfo');
    const descarteInfo = document.getElementById('descarteInfo');

    const lixoInfo = {
        "papel": {
            "reutilizacao": "O papel pode ser reutilizado para fazer rascunhos ou artesanato.",
            "descarte": "O papel deve ser descartado em lixeiras de reciclagem de papel."
        },
        "plastico": {
            "reutilizacao": "O plástico pode ser reutilizado para fazer vasos de plantas ou organizadores.",
            "descarte": "O plástico deve ser descartado em lixeiras de reciclagem de plástico."
        },
        "metal": {
            "reutilizacao": "O metal pode ser reutilizado para fazer artesanato ou projetos de bricolagem.",
            "descarte": "O metal deve ser descartado em lixeiras de reciclagem de metal."
        },
        "vidro": {
            "reutilizacao": "O vidro pode ser reutilizado para fazer jarros ou recipientes de armazenamento.",
            "descarte": "O vidro deve ser descartado em lixeiras de reciclagem de vidro."
        }
    };

    // Acessar a câmera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.srcObject = stream;
            video.play();
        });
    }

    // Tirar foto
    snap.addEventListener('click', function() {
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Simulando a identificação do tipo de lixo
        const tipoLixo = "papel"; // Simulação, você pode usar uma API de ML para identificar o tipo de lixo

        if (lixoInfo[tipoLixo]) {
            reutilizacaoInfo.textContent = lixoInfo[tipoLixo]["reutilizacao"];
            descarteInfo.textContent = lixoInfo[tipoLixo]["descarte"];
        } else {
            reutilizacaoInfo.textContent = "Tipo de lixo não encontrado.";
            descarteInfo.textContent = "Tipo de lixo não encontrado.";
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
