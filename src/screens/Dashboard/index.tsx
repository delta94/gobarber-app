import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import UserData from '../../data/models/UserData';
import { getProviders } from '../../data/services/providers/providers';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  HeaderTitle,
  ProfileButton,
  UserAvatar,
  UserName,
  ProviderListTitle,
  ProviderCard,
  ProviderAvatar,
  ProviderName,
  ProviderInfoContainer,
  ProviderAvailabilityContainer,
  ProviderAvailabilityText,
} from './styles';

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<UserData[]>([]);
  const {
    auth: { user },
  } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    getProviders().then(providers => {
      setProviders(providers);
    });
  }, []);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const handleProviderCardPress = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo,
          {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url || undefined }} />
        </ProfileButton>
      </Header>

      <FlatList
        data={providers}
        keyExtractor={provider => provider.id}
        ListHeaderComponent={
          <ProviderListTitle>Cabelereiros</ProviderListTitle>
        }
        renderItem={({ item: provider }) => {
          return (
            <ProviderCard onPress={() => handleProviderCardPress(provider.id)}>
              <ProviderAvatar
                source={{ uri: provider.avatar_url || undefined }}
              />
              <ProviderInfoContainer>
                <ProviderName>{provider.name}</ProviderName>
                <ProviderAvailabilityContainer>
                  <FeatherIcon name="calendar" size={14} color="#FF9000" />
                  <ProviderAvailabilityText>
                    Segunda à sexta
                  </ProviderAvailabilityText>
                </ProviderAvailabilityContainer>
                <ProviderAvailabilityContainer>
                  <FeatherIcon name="clock" size={14} color="#FF9000" />
                  <ProviderAvailabilityText>8h às 18h</ProviderAvailabilityText>
                </ProviderAvailabilityContainer>
              </ProviderInfoContainer>
            </ProviderCard>
          );
        }}
      />
    </Container>
  );
};

export default Dashboard;
