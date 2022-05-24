<template>
     <footer class="footer-light">
        <section class="section-b-space light-layout">
            <div class="container">
          <div class="grid footer-theme partition-f">
            <div class="lg:col-4 md:col-6">
              <div class="footer-title footer-mobile-title border-gray-200 border-b">
                <h3 class="mb-3">Sobre Nosotros</h3>
              </div>
              <div class="footer-contant mt-4 mb-6 md:mb-0">
                <div class="footer-logo">
                  <img src="@/assets/images/CompunexLogo.png" alt="logo" />
                </div >
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>
            <div class="sm:col-6 lg:col-2 xl:col-offset-1">
              <div class="sub-title">
                <div class="footer-title">
                  <h4>Productos</h4>
                </div>
                <div class="footer-contant">
                  <ul>
                    <li><a href="#">Laptops</a></li>
                    <li><a href="#">Tablets</a></li>
                    <li><a href="#">Teclados</a></li>
                    <li><a href="#">Impresoras</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="sm:col-6 lg:col-2 col-offset-3 sm:col-offset-0 ">
              <div class="sub-title">
                <div class="footer-title">
                  <h4>Servicios</h4>
                </div>
                <div class="footer-contant">
                  <ul>
                    <li><a href="#">shipping & return</a></li>
                    <li><a href="#">secure shopping</a></li>
                    <li><a href="#">gallary</a></li>
                    <li><a href="#">affiliates</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="sm:col-6 lg:col-3">
              <div class="sub-title">
                <div class="footer-title">
                  <h4>Contacto</h4>
                </div>
                <div class="footer-contant">
                  <ul class="contact-list">
                    <li class="group flex items-center">
                      <LocationMarkerIcon class="h-5 w-2"/> América N16-78 y Río de Janeiro
                    </li>
                    <li class="group flex items-center">
                      <PhoneIcon class="h-5 w-2"/>997-309-253
                    </li>
                    <li class="group flex items-center" style="text-transform: lowercase">
                      <MailIcon class="h-5 w-2" />compunexuio@gmail.com
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
      <div class="sub-footer bg-indigo-600">
        <div class="container">
          <div class="grid">
            <div class="col-12">
              <p> Derechos Reservados Compunex 2022</p>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
    import { LocationMarkerIcon, PhoneIcon, MailIcon} from '@heroicons/vue/solid'
    export default {
        components:{
            LocationMarkerIcon,
            PhoneIcon,
            MailIcon,
        }
    }
</script>

<style lang="scss" scoped>
  footer{
    position: relative;
    p {
      line-height: 32px;
      letter-spacing: 0.03em;
      margin-bottom: 0;
    }
    margin:4em 1em 4em 10em;

    @media (max-width: 767px){
      margin: 3em 3em 2em ;
    }
  }
  .footer-light {
    .footer-logo{
      img{
        width: 50%;
      }
    }
    .footer-theme .footer-mobile-title {
      display: none;
    }
    @media (max-width: 767px){
      .footer-theme .footer-mobile-title {
        display: block!important;
        margin-bottom: 1.2em;
      }
    }
    .footer-title{
      font-weight: 500;
    }
    .footer-social, .social-white{
      margin-top: 20px;
      display: flex;
      align-items: center;
      li {
        display: inline-block;
        padding-right: 45px;
      }
      i {
        font-size: 20px;
        color: black;
        transition: 0.5s ease;
        &:hover {
          color: gray !important;
          transition: 0.5s ease;
        }
      }
    }
    .social-white{
      li {
        padding-left: 22px;
        padding-right: 22px;
      }
    }
    .footer-theme {
      .footer-logo{
        margin-bottom: 18px;
      }
      li {
        position: relative;
        display: inherit;
        padding-top: 13px;
        text-transform: capitalize;
        font-size: 14px;
        color:grey;
        a {
          position: relative;
          color:grey;
          &:before {
            position: absolute;
            top: 20px;
            content: "";
            height: 2px;
            width: 0;
            background-color:  rgb(99, 42, 206);
            transition: 0.5s ease;
          }
        }
        &:hover {
          a {
            &:before{
              width: 100%;
              height: 2px;
              transition: 0.5s ease;
            }
          }
        }
      }
      .contact-list{
        li{
          position: relative;
          line-height: 28px;
          a {
            &:hover {
              color: gray;
              transition: all 0.5s ease;
            }
          }
          &:hover{
            color: lighten(black, 60%);
            transition: all 0.3s ease;
            a {
                &:before {
                display: none;
                }
            }
          }
          &:last-child{
            margin-bottom:-5px;
          }
        }
      }
    }
  }
  .sub-footer {
    display: flex;
    justify-content: center;
    p {
      color: white;
      padding: 15px 0;
      text-align: center;
    }
  }
</style>