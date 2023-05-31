const siteName = 'example.com'
const webinarBaseUrl = `http://${siteName}/webinar`

const emailTemplate = {
  subject: `${siteName} = Получена заявка на участие в вебинаре`,
  text: `Приветствуем!
На сайте ${siteName} пользователь <%= user.fullName %> оставил заявку на участие в вебинаре <%= event.name %>, который пройдет <%= event.date %>.
Контакты пользователя:
<%= user.contacts %>
<%= user.additional %>`,
};

const emailUserTemplate = {
  subject: 'Успешная регистрация на вебинар',
  text: `Приветствуем!
  Вы зарегистрировались на вебинар <%= event.name %>, который пройдет <%= event.date %>. Ниже прикрепляем ссылку на вебинар для подключения:
  ${webinarBaseUrl}/<%= event.slug %>
  До встречи!`,
};

module.exports = {
  async afterCreate(event) {
    const { result } = event;
    const contacts = [`Email: ${result.email}`];
    const additional = [];

    if (result.phone) {
      contacts.push(`Телефон: ${result.phone}`)
    }

    if (result.companyName) {
      additional.push(`Компания: ${result.companyName}`)
    }
    if (result.companyPosition) {
      additional.push(`Роль: ${result.companyPosition}`)
    }

    try{
      await strapi.plugins['email'].services.email.sendTemplatedEmail(
        {
          to: process.env.REQUESTS_EMAIL,
        },
        emailTemplate,
        {
          event: {
            name: result.eventName,
            date: result.eventDate,
          },
          user: {
            contacts: contacts.join(', '),
            fullName: result.fullName,
            additional: additional.length > 0 ? `Дополнительно пользователь указал в заявке: \n ${additional.join(', ')}` : '',
          },
        }
      );

      await strapi.plugins['email'].services.email.sendTemplatedEmail(
        {
          to: result.email,
        },
        emailUserTemplate,
        {
          event: {
            name: result.eventName,
            date: result.eventDate,
            slug: result.eventSlug,
          },
        }
      );
    } catch(err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
};
