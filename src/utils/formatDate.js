export default function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    const newDate = new Date(date)

    return newDate.toLocaleDateString('in-ID', options)
}