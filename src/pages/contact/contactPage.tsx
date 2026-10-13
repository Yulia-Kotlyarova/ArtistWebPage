import { env } from "@/shared/config/env";
import { ActionLink } from "@/shared/link";

const SUBJECT = "Покупка картины / Вопрос";

export function ContactPage() {
  const body = `
Здравствуйте!

Меня интересует работа:
— Название / ссылка:

Доставка:
— Город / страна:

Вопросы:
— (оформление/рамка/сроки/оплата)

Контакты:
— Имя:
— Email:

Спасибо!
`.trim();

  const mailto = `mailto:${env.contactEmail}?subject=${encodeURIComponent(
    SUBJECT,
  )}&body=${encodeURIComponent(body)}`;

  return (
    <div className="mx-auto w-full max-w-5xl">
      <section className="grid gap-8 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <div className="border bg-background">
            <img
              src="/images/contact-art/contacr-full.jpeg"
              alt="Artwork fragment"
              className="h-[280px] w-full object-cover sm:h-[360px] lg:h-[520px]"
              loading="lazy"
            />
          </div>
        </div>

        <div className="lg:col-span-7 text-left">
          <header className="space-y-4">
            <p className="muted">Purchase / Contact</p>
            <h1>Покупка и связь</h1>

            <div className="space-y-3">
              <p className="lead">
                Цены указаны в описании каждой работы. Если какая-то из них
                откликнулась вам, напишите мне — я расскажу о наличии, стоимости
                и доставке.
              </p>
              <p className="muted">
                Нажмите кнопку ниже — откроется ваша почта с уже подготовленным
                письмом.
              </p>
            </div>
          </header>

          <section className="my-8 border bg-background p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <ActionLink variant="button">
                <a href={mailto} className="button-link">
                  Написать
                </a>
              </ActionLink>

              <p className="caption sm:text-right">
                Письмо будет отправлено из вашего почтового клиента.
              </p>
            </div>
          </section>
          <p className="caption">
            Если почта не открылась, напишите напрямую:{" "}
            {env.contactEmail}
          </p>
        </div>
      </section>
    </div>
  );
}
