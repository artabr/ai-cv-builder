import { ProCard } from '@ant-design/pro-components';
import { Typography } from 'antd';
import { UserCard } from '../../components/UserCard/UserCard';
import css from './About.module.css';

export default function AboutPage() {
  const { Title, Paragraph } = Typography;
  return (
    <ProCard colSpan={24} layout="center">
      <div className={css.wrapper}>
        <div>
          <Title level={1}>Resumesaurus Rexes</Title>
          <Paragraph>
            Resumesaurus Rexes is revolutionizing the way job seekers approach resume building. Our platform harnesses
            the power of innovative AI technology, resulting in a streamlined process that ensures your resume truly
            stands out in a crowded job market.
          </Paragraph>
          <Paragraph>
            Gone are the days of generic resumes that often fail to capture the attention of potential employers. With
            Resumesaurus Rexes, we use cutting-edge algorithms to analyze the job descriptions provided by you and
            personalize your resume for the specific position you're applying for. The end result is a tailored resume
            that showcases your most relevant skills and experience – just the information that employers are looking
            for.
          </Paragraph>
          <Paragraph>
            Our resume builder is designed to be user-friendly and to guide you through every step of the process. Once
            you upload your job description, the AI technology takes over, doing the heavy lifting in parsing the text
            and organizing the most important elements of your work experience and educational background. With this
            data compiled, you can easily customize the design of your resume with a variety of templates that fit your
            unique style and preferences.
          </Paragraph>
          <Paragraph>
            We understand that every job seeker has unique experiences and qualifications that set them apart from
            others vying for the same positions. Our goal at Resumesaurus Rexes is to provide a platform that helps you
            to showcase what makes you stand out, rather than just blending in. By using our platform, you can create a
            resume that is as unique as you are, while still providing all the critical information that hiring managers
            are looking for.
          </Paragraph>
          <Paragraph>
            Finally, our team is dedicated to providing exceptional customer support to ensure that you have a positive
            experience using our platform. Whether you're seeking guidance on resume formatting or simply have a
            question, we're happy to help. With Resumesaurus Rexes, you won’t just build a resume – you’ll take the
            first step toward landing your dream job.
          </Paragraph>
        </div>
        <div>
          <Title level={2}>The team</Title>
          <div className={css.userWrapper}>
            <UserCard
              avatar="images/Artem_Abramov.png"
              name="Artem Abramov"
              mail="artem_abramov1@epam.com"
              title="General director"
            />
            <UserCard
              avatar="images/Ivan_Cherepnin.png"
              name="Ivan Cherepnin"
              mail="ivan_cherepnin@epam.com"
              title="Great BE"
            />
            <UserCard
              avatar="images/Igor_Protsiuk.png"
              name="Igor Protsiuk"
              mail="igor_protsiuk@epam.com"
              title="FE engineer"
            />
            <UserCard
              avatar="images/Viktor_Kyssa.png"
              name="Viktor Kyssa"
              mail="viktor_kyssa@epam.com"
              title="FE engineer"
            />
            <UserCard
              avatar="images/Alisher_Zhangbyrshy.png"
              name="Alisher Zhangbyrshy"
              mail="alisher_zhangbyrshy@epam.com"
              title="FE engineer"
            />
            <UserCard
              avatar="images/Yauheni_Bykau.png"
              name="Yauheni Bykau "
              mail="zoroo@mail.ru"
              title="Passionate FE dev"
            />
          </div>
        </div>
      </div>
    </ProCard>
  );
}
