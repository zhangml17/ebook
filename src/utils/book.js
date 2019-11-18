/**
 * 存放项目中所有常量
 */
import { getReadTime } from './localStorage'


 export const FONT_SIZE_LIST = [
    { fontSize: 12 },
    { fontSize: 14 },
    { fontSize: 16 },
    { fontSize: 18 },
    { fontSize: 20 },
    { fontSize: 22 },
    { fontSize: 24 }
 ]

 export const FONT_FAMILY = [
   { font: 'Default' },
   { font: 'Cabin' },
   { font: 'Days One' },
   { font: 'Montserrat' },
   { font: 'Tangerine' }
 ]

 export function themeList(vue) {
   return [
    {
      alias: vue.$t('book.themeDefault'),
      name: 'Default',
      style: {
        body: {
          'color': '#4c5059',
          'background':'#cecece'
        }
      }
    },
    {
      alias: vue.$t('book.themeGold'),
      name: 'Gold',
      style: {
        body: {
          'color': '#5c5b56',
          'background':'#c6c2b6'
        }
      }
    },
    {
      alias: vue.$t('book.themeEye'),
      name: 'Eye',
      style: {
        body: {
          'color': '#404c42',
          'background':'#a9c1a9'
        }
      }
    },
    {
      alias: vue.$t('book.themeNight'),
      name: 'Night',
      style: {
        body: {
          'color': '#cecece',
          'background':'#000000'
        }
      }
    },
   ]
 }

 export function addCSS(href) {
   let link = document.createElement('link')
   link.setAttribute('rel', 'stylesheet')
   link.setAttribute('type', 'text/css')
   link.setAttribute('href', href)
   document.getElementsByTagName('head')[0].append(link)
 }
// 因为 addCSS是通过append添加link标签，所以会一直添加，因此会重复，需要清除重复
 export function removeCSS(href) {
   let links = document.getElementsByTagName('link')
   for(let i=links.length;i>=0;i--) {
     const link = links[i]
     if(link && link.getAttribute('href') && link.getAttribute('href') === href) {
       link.parentNode.removeChild(link)
     }
   }
 }

 export function removeAllCSS() {
   removeCSS(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
   removeCSS(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
   removeCSS(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
   removeCSS(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
 }

 export function getReadTimeByMinute(fileName) {
  let readTime = getReadTime(fileName)
  if(!readTime) {
    return 0
  }else {
    return Math.ceil(readTime / 60)
  }
}
