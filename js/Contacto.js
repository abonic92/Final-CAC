export default {
    data() {
        return {};
    },


    template: ` 
    <div class="container23">
            <h2 class="text-center">Como contactarme</h2>
        </div>

        <div class="d-flex justify-content-between">
            <div class="contacto w-50">
                <h5 class="container2">Ubicación de mi oficina</h5>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.3739991971074!2d-59.002311923748096!3d-27.45761361619285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94450c8f71485f9d%3A0xf38402adb4cf5002!2sRold%C3%A1n%20344%2C%20H3506BAG%20Resistencia%2C%20Chaco!5e0!3m2!1ses!2sar!4v1698310651070!5m2!1ses!2sar"
                    width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>

            <div class="contacto w-50">
                <h5 class="container23">Contacto</h5>
                <div class="col-lg-6 mx-auto">
                    <div class="py-1">
                        <form action="https://formspree.io/f/mrgwjopn" method="POST" id="my-form">
                            <div class="row g-2">
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" id="nombre" name="nombre"
                                            placeholder="Your Name" required>
                                        <label for="nombre">Nombre y Apellido</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="email" class="form-control" id="email" name="_replyto"
                                            placeholder="Your Email" required>
                                        <label for "email">Email</label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" id="subject" name="asunto"
                                            placeholder="Subject">
                                        <label for="subject">Asunto</label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-floating">
                                        <textarea class="form-control" placeholder="Leave a message here" name="mensaje"
                                            id="message" style="height: 150px" required></textarea>
                                        <label for="message">Mensaje</label>
                                    </div>
                                </div>
                                <div class="col-12 text-center">
                                    <button class="btn btn-dark py-3" type="submit" id="my-form-button">Enviar</button>
                                </div>
                            </div>
                        </form>
                        <p id="my-form-status"></p>
                    </div>
                </div>
            </div>
        </div>
        `
    
   
};
