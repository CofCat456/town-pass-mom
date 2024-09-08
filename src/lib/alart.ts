import { Modal } from 'ant-design-vue'

export function success(title: string, content: string = '') {
  Modal.success({
    title,
    content: content.length ? content : null,
  })
}

export function error(title: string, content: string = '') {
  Modal.error({
    title,
    content: content.length ? content : null,
  })
}
