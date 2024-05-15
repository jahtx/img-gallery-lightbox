import Title from '@/components/Title';
import '@/styles/styles.scss';

export default function Home() {
  return (
    <div className="homemade-container-sm mx-auto d-flex flex-column">
      <Title>Hello LightBox</Title>
      <p>
        Mauris in augue felis. Phasellus aliquam sapien a arcu sollicitudin, vel
        fringilla enim sollicitudin. Nullam augue ligula, ullamcorper in
        ullamcorper condimentum, venenatis id dolor. Cras posuere nisl ac erat
        ullamcorper viverra. Sed vulputate felis non tincidunt posuere. In et
        purus libero. Vestibulum eu arcu vitae ligula fringilla maximus ac et
        sem. Sed pulvinar dui et risus interdum pharetra. Etiam volutpat lorem
        mauris, nec commodo neque tristique in. Duis ut interdum augue.
        Curabitur elementum turpis vitae sapien blandit dapibus. Mauris congue
        turpis in lacus condimentum, vel sagittis ex efficitur.
      </p>
    </div>
  );
}
