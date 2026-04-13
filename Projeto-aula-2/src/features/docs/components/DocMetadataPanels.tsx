import { StyleSheet, Text } from 'react-native';

import { ReadmeDoc } from '@/data/readmeDocs';
import { ContentPanel } from '@/shared/components/ContentPanel';
import { GenericPillList } from '@/shared/components/GenericPillList';
import { theme } from '@/shared/theme/tokens';
import { typedMemo } from '@/shared/utils/typedMemo';

interface DocMetadataPanelsProps {
  doc: ReadmeDoc;
}

function DocMetadataPanelsComponent({ doc }: DocMetadataPanelsProps) {
  return (
    <>
      <ContentPanel title="Como usar" variant="light">
        {doc.usage.length === 0 ? (
          <Text style={styles.text}>Sem comandos explicitos neste README.</Text>
        ) : (
          doc.usage.map((command) => (
            <Text key={command} style={styles.text}>
              • {command}
            </Text>
          ))
        )}
      </ContentPanel>

      <ContentPanel title="Dependencias" variant="light">
        <GenericPillList
          items={doc.dependencies}
          keyExtractor={(item) => item}
          labelExtractor={(item) => item}
          emptyLabel="Nenhuma dependencia listada no README"
        />
      </ContentPanel>

      <ContentPanel title="Explicacao ludica para iniciantes" variant="highlight">
        <Text style={styles.highlightText}>{doc.playfulHint}</Text>
      </ContentPanel>
    </>
  );
}

export const DocMetadataPanels = typedMemo(DocMetadataPanelsComponent);

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textDark,
    fontSize: 13,
    lineHeight: 20,
  },
  highlightText: {
    color: theme.colors.brandDark,
    fontSize: 13,
    lineHeight: 20,
  },
});
