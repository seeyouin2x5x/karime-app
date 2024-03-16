import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Button,
  Snackbar,
  Divider,
  Modal,
  Caption,
} from "react-native-paper";

const TriviaGame = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [points, setPoints] = useState(10);
  const [timer, setTimer] = useState(120); // Increased time to 120 seconds
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        clearInterval(interval);
        setModalVisible(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    const modalInterval = setInterval(() => {
      setModalVisible(true);
    }, 7000); // Show modal every 7 seconds

    return () => clearInterval(modalInterval);
  }, []);

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentIndex];
    if (answer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
      setPoints(points + 1);
      setSnackbarMessage("Correct !");
    } else {
      setPoints(points - 1);
      setSnackbarMessage("Incorrect !");
    }
    setSnackbarVisible(true);
    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    if (currentIndex === questions.length - 1) {
      // End of questions, reset to first question
      setCurrentIndex(0);
    }
  };

  const onDismissSnackbar = () => {
    setSnackbarVisible(false);
    setSnackbarMessage("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Testez vos connaissances de l'islam en répondant par oui ou non. Vous
        avez {timer} secondes pour répondre autant de questions que possible.
      </Text>
      <Text style={styles.instructions}>
        Chaque point que vous gagnez sera donné à la mosquée équivalent à une
        contribution caritative. Bonne chance !
      </Text>
      <Text style={styles.points}>
        Points: {points} - Temps restant: {timer} secondes
      </Text>
      {/* <Text style={styles.timer}>Temps restant: {timer} secondes</Text> */}

      <Divider style={styles.divider} />
      <View style={styles.cardContainer}>
        <ScrollView style={styles.scrollView}>
          <Card>
            <Card.Content>
              <Title>{questions[currentIndex].question}</Title>
              {/* <Paragraph>{questions[currentIndex].question}</Paragraph> */}
            </Card.Content>
            {/* <Caption>Question {currentIndex + 1}</Caption> */}
          </Card>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => handleAnswer("oui")}
            style={styles.button}
          >
            Oui
          </Button>
          <Button
            mode="contained"
            onPress={() => handleAnswer("non")}
            style={styles.button}
          >
            Non
          </Button>
        </View>
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={onDismissSnackbar}
        duration={200} // Duration for the snackbar to be visible
        style={{ backgroundColor: "rgb(82, 99, 79)" }} // Yellow color code
      >
        {snackbarMessage}
      </Snackbar>
      {/* <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Title>Temps écoulé !</Title>
          <Paragraph>
            Merci pour votre participation ! Vous avez obtenu {points} points.
            Vous pouvez continuer à jouer pour augmenter votre score. Chaque
            point que vous gagnez sera donné à la mosquée équivalent à une
            contribution caritative.
          </Paragraph>
          <Button mode="contained" onPress={() => setModalVisible(false)}>
            Continuer à jouer
          </Button>
        </View>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  divider: {
    marginBottom: 20,
    width: "100%",
  },
  cardContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    width: "40%",
  },
  points: {
    marginBottom: 10,
    fontSize: 18,
  },
  timer: {
    marginBottom: 10,
    fontSize: 18,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default TriviaGame;

const questions = [
  {
    id: 1,
    question:
      "Ramadan est-il le neuvième mois du calendrier lunaire islamique ?",
    answer: "oui",
  },
  {
    id: 2,
    question: "Eid al-Fitr est-il célébré à la fin du Ramadan ?",
    answer: "oui",
  },
  {
    id: 3,
    question: "Le Coran est-il le livre sacré de l'islam ?",
    answer: "oui",
  },
  { id: 4, question: "La Kaaba est-elle située à La Mecque ?", answer: "oui" },
  {
    id: 5,
    question:
      "L'islam est-il la religion monothéiste la plus répandue dans le monde ?",
    answer: "oui",
  },
  {
    id: 6,
    question: "Muhammad est-il le prophète fondateur de l'islam ?",
    answer: "oui",
  },
  {
    id: 7,
    question: 'Le mot "islam" signifie-t-il "soumission à Dieu" en arabe ?',
    answer: "oui",
  },
  {
    id: 8,
    question: "La zakat est-elle l'un des cinq piliers de l'islam ?",
    answer: "oui",
  },
  {
    id: 9,
    question: "Les musulmans prient-ils cinq fois par jour ?",
    answer: "oui",
  },
  {
    id: 10,
    question: "Le hajj est-il le pèlerinage annuel à La Mecque ?",
    answer: "oui",
  },
  {
    id: 11,
    question: "La foi en un seul Dieu est-elle un pilier de l'islam ?",
    answer: "oui",
  },
  {
    id: 12,
    question: "Le minaret est-il une tour associée aux mosquées ?",
    answer: "oui",
  },
  {
    id: 13,
    question: "Le jeûne du mois de Ramadan dure-t-il 29 ou 30 jours ?",
    answer: "oui",
  },
  {
    id: 14,
    question: "La circoncision est-elle pratiquée dans l'islam ?",
    answer: "oui",
  },
  {
    id: 15,
    question: "La langue arabe est-elle considérée comme sacrée dans l'islam ?",
    answer: "oui",
  },
  {
    id: 16,
    question:
      "La charia est-elle la loi islamique basée sur le Coran et les hadiths ?",
    answer: "oui",
  },
  {
    id: 17,
    question:
      "Le jihâd est-il une lutte intérieure et extérieure pour les musulmans ?",
    answer: "oui",
  },
  {
    id: 18,
    question: "La mosquée Al-Aqsa est-elle située à Jérusalem ?",
    answer: "oui",
  },
  {
    id: 19,
    question: "Le tawhid est-il le concept de l'unicité de Dieu dans l'islam ?",
    answer: "oui",
  },
  {
    id: 20,
    question:
      "Le hadith est-il une collection des paroles et actions du prophète Muhammad ?",
    answer: "oui",
  },
  {
    id: 21,
    question:
      "La polygamie est-elle autorisée dans l'islam, sous certaines conditions ?",
    answer: "oui",
  },
  {
    id: 22,
    question:
      "Le dhikr est-il une pratique de rappel et de méditation de Dieu ?",
    answer: "oui",
  },
  {
    id: 23,
    question: "La Sunna est-elle la tradition prophétique de Muhammad ?",
    answer: "oui",
  },
  {
    id: 24,
    question: "La sourate Al-Fatiha est-elle la première sourate du Coran ?",
    answer: "oui",
  },
  {
    id: 25,
    question:
      "La hijra fait-elle référence à l'émigration de Muhammad de La Mecque à Médine ?",
    answer: "oui",
  },
  {
    id: 26,
    question: "Le halal désigne-t-il ce qui est licite ou permis en islam ?",
    answer: "oui",
  },
  {
    id: 27,
    question:
      "Le ramadan est-il précédé par le mois de Sha'ban dans le calendrier islamique ?",
    answer: "oui",
  },
  {
    id: 28,
    question:
      "La Kaaba a-t-elle été construite par Abraham et son fils Ismaël ?",
    answer: "oui",
  },
  {
    id: 29,
    question:
      "Le prophète Muhammad a-t-il reçu la première révélation du Coran à l'âge de 40 ans ?",
    answer: "oui",
  },
  {
    id: 30,
    question:
      "La Laylat al-Qadr est-elle une nuit spéciale pendant le mois de Ramadan ?",
    answer: "oui",
  },
  {
    id: 31,
    question: 'Le mot "Allah" est-il utilisé pour désigner Dieu en arabe ?',
    answer: "oui",
  },
  {
    id: 32,
    question:
      "La prière du vendredi est-elle une obligation pour les hommes musulmans ?",
    answer: "oui",
  },
  {
    id: 33,
    question: 'Le mot "haram" désigne-t-il ce qui est interdit en islam ?',
    answer: "oui",
  },
  {
    id: 34,
    question: "Le Coran est-il divisé en 114 chapitres appelés sourates ?",
    answer: "oui",
  },
  {
    id: 35,
    question: "La Sourate Al-Ikhlas affirme-t-elle l'unicité de Dieu ?",
    answer: "oui",
  },
  {
    id: 36,
    question:
      "Les musulmans jeûnent-ils du lever au coucher du soleil pendant le Ramadan ?",
    answer: "oui",
  },
  {
    id: 37,
    question:
      "Le mus'haf est-il un terme utilisé pour désigner le Coran écrit ?",
    answer: "oui",
  },
  {
    id: 38,
    question: "La religion de l'islam a-t-elle été fondée au 7e siècle ?",
    answer: "oui",
  },
  {
    id: 39,
    question:
      "La boussole est-elle utilisée pour déterminer la direction de La Mecque lors de la prière ?",
    answer: "oui",
  },
  {
    id: 40,
    question: "La Sourate Al-Baqara est-elle la plus longue sourate du Coran ?",
    answer: "oui",
  },
  {
    id: 41,
    question: "La zakat est-elle l'aumône obligatoire pour les musulmans ?",
    answer: "oui",
  },
  {
    id: 42,
    question:
      "La Sourate An-Nas affirme-t-elle la protection de Dieu contre le mal ?",
    answer: "oui",
  },
  {
    id: 43,
    question:
      "La période du Hajj coïncide-t-elle avec le mois de Dhu al-Hijjah ?",
    answer: "oui",
  },
  {
    id: 44,
    question: 'Le mot "umma" désigne-t-il la communauté musulmane ?',
    answer: "oui",
  },
  {
    id: 45,
    question: "Le mus'haf d'Uthman est-il une version canonique du Coran ?",
    answer: "oui",
  },
  {
    id: 46,
    question:
      "Le Suhur est-il le repas avant le lever du soleil pendant le Ramadan ?",
    answer: "oui",
  },
  {
    id: 47,
    question:
      "La prière de l'aube est-elle la première prière quotidienne des musulmans ?",
    answer: "oui",
  },
  {
    id: 48,
    question:
      "Les musulmans sont-ils tenus d'effectuer le Wudu (ablution rituelle) avant la prière ?",
    answer: "oui",
  },
  {
    id: 49,
    question:
      "La taqwa désigne-t-elle la piété et la conscience de Dieu en islam ?",
    answer: "oui",
  },
  {
    id: 50,
    question: 'Le mot "salah" désigne-t-il la prière rituelle en islam ?',
    answer: "oui",
  },
  {
    id: 51,
    question: "La bataille de Badr a-t-elle eu lieu en l'an 624 de notre ère ?",
    answer: "oui",
  },
  {
    id: 52,
    question: "Le fait de donner la charité est-il encouragé en islam ?",
    answer: "oui",
  },
  {
    id: 53,
    question: "La Sourate Al-Kafirun rejette-t-elle le polythéisme ?",
    answer: "oui",
  },
  {
    id: 54,
    question:
      "La période de l'Isha commence-t-elle après le coucher du soleil ?",
    answer: "oui",
  },
  {
    id: 55,
    question:
      "La Sourate Al-Mulk affirme-t-elle le pouvoir et la souveraineté de Dieu ?",
    answer: "oui",
  },
  {
    id: 56,
    question:
      "La nuit du destin est-elle une nuit où les actes déterminants de l'année sont révélés ?",
    answer: "oui",
  },
  {
    id: 57,
    question:
      'Le mot "Qibla" désigne-t-il la direction de la prière musulmane ?',
    answer: "oui",
  },
  {
    id: 58,
    question:
      "Le mihrab est-il une niche indiquant la direction de La Mecque dans une mosquée ?",
    answer: "oui",
  },
  {
    id: 59,
    question:
      "La Sourate Al-Baqara aborde-t-elle plusieurs aspects de la vie et de la foi musulmanes ?",
    answer: "oui",
  },
  {
    id: 60,
    question:
      "La prière de Jumu'ah est-elle une prière de groupe obligatoire le vendredi ?",
    answer: "oui",
  },
  {
    id: 61,
    question: 'Le mot "iman" désigne-t-il la foi et la croyance en islam ?',
    answer: "oui",
  },
  {
    id: 62,
    question:
      "Les musulmans sont-ils encouragés à lire le Coran régulièrement ?",
    answer: "oui",
  },
  {
    id: 63,
    question: 'Le mot "Fiqh" désigne-t-il la jurisprudence islamique ?',
    answer: "oui",
  },
  {
    id: 64,
    question: "La Sourate Ar-Rahman célèbre-t-elle les attributs de Dieu ?",
    answer: "oui",
  },
  {
    id: 65,
    question:
      "La Sourate Al-Ma'un encourage-t-elle la générosité et la compassion envers les autres ?",
    answer: "oui",
  },
  {
    id: 66,
    question:
      "Le hadith Qudsi est-il un hadith qui contient les paroles de Dieu révélées au prophète Muhammad ?",
    answer: "oui",
  },
  {
    id: 67,
    question:
      "Le voyage nocturne de Muhammad vers Jérusalem est-il appelé Al-Isra ?",
    answer: "oui",
  },
  {
    id: 68,
    question:
      "Les musulmans récitent-ils la Shahada comme une déclaration de foi ?",
    answer: "oui",
  },
  {
    id: 69,
    question:
      "La Sourate Al-Asr souligne-t-elle l'importance du temps dans la vie humaine ?",
    answer: "oui",
  },
  {
    id: 70,
    question:
      'Le concept de "Ummah" souligne-t-il l\'unité et la solidarité de la communauté musulmane ?',
    answer: "oui",
  },
  {
    id: 71,
    question:
      "La Sourate Al-Anfal aborde-t-elle les règles de la guerre juste en islam ?",
    answer: "oui",
  },
  {
    id: 72,
    question:
      "Les musulmans sont-ils encouragés à rechercher la connaissance et l'éducation ?",
    answer: "oui",
  },
  {
    id: 73,
    question:
      'Le terme "ghusl" désigne-t-il le bain rituel avant certaines pratiques religieuses ?',
    answer: "oui",
  },
  {
    id: 74,
    question:
      "La zakat al-Fitr est-elle une charité obligatoire à la fin du Ramadan ?",
    answer: "oui",
  },
  {
    id: 75,
    question: 'Le mot "Jannah" désigne-t-il le paradis en islam ?',
    answer: "oui",
  },
  {
    id: 76,
    question:
      'Le terme "Tajwid" désigne-t-il la récitation correcte du Coran ?',
    answer: "oui",
  },
  {
    id: 77,
    question:
      "Le nombre de Rak'ah dans la prière de Dhuhr est-il de 4 unités ?",
    answer: "oui",
  },
  {
    id: 78,
    question:
      "La Sourate Al-Mumtahina traite-t-elle de la question de la loyauté et de la confiance envers les non-musulmans ?",
    answer: "oui",
  },
  {
    id: 79,
    question:
      'Le terme "fitna" désigne-t-il une épreuve ou une tentation en islam ?',
    answer: "oui",
  },
  {
    id: 80,
    question: 'Le terme "jannah" désigne-t-il le paradis en islam ?',
    answer: "oui",
  },
  {
    id: 81,
    question:
      "Les musulmans sont-ils encouragés à donner l'aumône aux pauvres ?",
    answer: "oui",
  },
  {
    id: 82,
    question:
      'Le terme "iftar" désigne-t-il le repas pour rompre le jeûne pendant le Ramadan ?',
    answer: "oui",
  },
  {
    id: 83,
    question: "La Sourate Al-Fajr aborde-t-elle le jour du jugement dernier ?",
    answer: "oui",
  },
  {
    id: 84,
    question:
      'Le terme "fi sabilillah" désigne-t-il le fait de dépenser pour la cause de Dieu ?',
    answer: "oui",
  },
  {
    id: 85,
    question:
      'Le terme "hijab" désigne-t-il le voile porté par les femmes musulmanes ?',
    answer: "oui",
  },
  {
    id: 86,
    question:
      "La Sourate Al-Mujadila aborde-t-elle la question de la justice et de l'équité ?",
    answer: "oui",
  },
  {
    id: 87,
    question:
      "Les musulmans sont-ils tenus de jeûner pendant le mois de Ramadan ?",
    answer: "oui",
  },
  {
    id: 88,
    question: 'Le mot "mus\'haf" désigne-t-il le texte du Coran écrit ?',
    answer: "oui",
  },
  {
    id: 89,
    question:
      "La zakat est-elle obligatoire pour les musulmans qui ont atteint un certain seuil de richesse ?",
    answer: "oui",
  },
  {
    id: 90,
    question:
      'Le terme "zina" désigne-t-il l\'adultère ou la fornication en islam ?',
    answer: "oui",
  },
  {
    id: 91,
    question:
      "La Sourate Al-Hujurat aborde-t-elle les questions de fraternité et d'harmonie sociale ?",
    answer: "oui",
  },
  {
    id: 92,
    question:
      'Le terme "Dhikr" désigne-t-il la remémoration de Dieu en islam ?',
    answer: "oui",
  },
  {
    id: 93,
    question:
      'Le terme "Shahada" désigne-t-il la profession de foi musulmane ?',
    answer: "oui",
  },
  {
    id: 94,
    question: "La période du Fajr commence-t-elle au lever du soleil ?",
    answer: "oui",
  },
  {
    id: 95,
    question: "Le fait de manger du porc est-il interdit en islam ?",
    answer: "oui",
  },
  {
    id: 96,
    question:
      "La période de l'Asr commence-t-elle après le coucher du soleil ?",
    answer: "oui",
  },
  {
    id: 97,
    question:
      "Les musulmans sont-ils encouragés à donner l'aumône aux pauvres et aux nécessiteux ?",
    answer: "oui",
  },
  {
    id: 98,
    question:
      'Le terme "sujud" désigne-t-il la prosternation pendant la prière ?',
    answer: "oui",
  },
  {
    id: 99,
    question: 'Le mot "masjid" désigne-t-il une mosquée en arabe ?',
    answer: "oui",
  },
  {
    id: 100,
    question:
      "La Sourate Al-Kawthar célèbre-t-elle l'abondance et la générosité de Dieu ?",
    answer: "oui",
  },
];
