import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView } from 'react-native';
import { LinearGradient } from 'expo';

const PolicyScreen = (props) => {

    return (
        <LinearGradient 
        colors={['rgba(235,43,70,1)', 'rgba(0,21,72,1)']}
        style={{flex: 1, justifyContent: 'center'
        
        }}>
        <View style={styles.modal}>
            <Text style={[styles.title, styles.firstTitle]}>Användarvillkor</Text>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.listItem}>
                    <Text style={styles.title}> Privacy Policy</Text>
                    <Text style={styles.text}>
                        Jenny Jäderborn Amanda Bengtsson built the Wordgame app as a Free app. This SERVICE is provided by Jenny Jäderborn Amanda Bengtsson at no cost and is intended for use as is.
                    </Text>
                    <Text style={styles.text}>
                        This page is used to inform visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service.
                    </Text>
                    <Text style={styles.text}>
                        If you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the Service. I will not use or share your information with anyone except as described in this Privacy Policy.
                </Text>
                    <Text style={styles.text}>
                        The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Wordgame unless otherwise defined in this Privacy Policy.
            </Text>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.title}>Information Collection and Use</Text>
                    <Text style={styles.text}>
                        For a better experience, while using our Service, I may require you to provide us with certain personally identifiable information. The information that I request will be retained on your device and is not collected by me in any way.
    </Text>
                    <Text style={styles.text}>
                        The app does use third party services that may collect information used to identify you.
    </Text>
                    <Text style={styles.text}>
                        Link to privacy policy of third party service providers used by the app
    </Text>


                </View>

                <View style={styles.listItem}>
                    <Text style={styles.title}>Google Play Services
        Log Data</Text>
                    <Text style={styles.text}>I want to inform you that whenever you use my Service, in a case of an error in the app I collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing my Service, the time and date of your use of the Service, and other statistics.</Text>
                </View>

                <View style={styles.listItem}>
                    <Text style={styles.title}>Cookies</Text>
                    <Text style={styles.text}>Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.</Text>
                    <Text style={styles.text}>This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service</Text>
                </View>

                <View style={styles.listItem}>
                    <Text style={styles.title}>Service Providers</Text>
                    <Text style={styles.text}>I may employ third-party companies and individuals due to the following reasons:</Text>
                    <Text style={styles.text}>
                        To facilitate our Service;
                        To provide the Service on our behalf;
                        To perform Service-related services; or
                        To assist us in analyzing how our Service is used.
                    I want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.</Text>
                </View>

                <View style={styles.listItem}>
                    <Text style={styles.title}>Security</Text>
                    <Text style={styles.text}>I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.</Text>
                </View>


                <View style={styles.listItem}>
                    <Text style={styles.title}>Links to Other Sites</Text>
                    <Text style={styles.text}>This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me. Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</Text>
                </View>

                <View style={styles.listItem}>
                    <Text style={styles.title}>Children’s Privacy</Text>
                    <Text style={styles.text}>These Services do not address anyone under the age of 13. I do not knowingly collect personally identifiable information from children under 13. In the case I discover that a child under 13 has provided me with personal information, I immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact me so that I will be able to do necessary actions.</Text>
                </View>

                <View style={styles.listItem}>
                    <Text style={styles.title}>Changes to This Privacy Policy</Text>
                    <Text style={styles.text}>I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.</Text>
                </View>

                <View style={styles.listItem}>
                    <Text style={styles.title}>Contact Us</Text>
                    <Text style={styles.text}>If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me.</Text>
                    <Text style={styles.text}>This privacy policy page was created at privacypolicytemplate.net and modified/generated by App Privacy Policy Generator</Text>
                </View>



            </ScrollView>

            <TouchableHighlight style={styles.closeButton} onPress={() => props.modalClose()}>
                <Text style={styles.closeButtonText}>Stäng</Text>
            </TouchableHighlight>
        </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({

    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        marginTop: 20,
        
    },
    firstTitle: {
        color: 'white',
        fontSize: 22
    },

    title: {
        fontSize: 20,
        padding: 12,
        margin: 0
    },
    text: {
        margin: 5
    },
    closeButton: {
        padding: 20,
        margin: 0
    },
    contentContainer: {
        width: '100%',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10

      },
      closeButtonText: {
          //fontWeight: 'bold',
          fontSize: 22,
          color: 'white'
      }


})

export default PolicyScreen